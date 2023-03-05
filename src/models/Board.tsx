import { Cell, stateCell } from "./Cell";
import getRandomPos from "../helpers/getRandomPos";

export enum TypeBoard {
	SMALL,
	MEDIUM,
	LARGE,
}
type TParamBoard = {
	[key in TypeBoard]: { y: number; x: number; mines: number };
};
export const paramBoard: TParamBoard = {
	[TypeBoard.SMALL]: { y: 10, x: 10, mines: 10 },
	[TypeBoard.MEDIUM]: { y: 16, x: 16, mines: 40 },
	[TypeBoard.LARGE]: { y: 16, x: 30, mines: 99 },
};
export class Board {
	cells: Cell[][] = [];
	size: { x: number; y: number } = { x: 0, y: 0 };
	countMine: number = 0;
	countFlags: number = 0;
	openedCell: number = 0;

	constructor() {}

	public initCells(sizeBoard: TypeBoard) {
		this.size = { x: paramBoard[sizeBoard].x, y: paramBoard[sizeBoard].y };
		this.countMine = paramBoard[sizeBoard].mines;
		this.countFlags = paramBoard[sizeBoard].mines;
		for (let y = 0; y < this.size.y; y++) {
			const row: Cell[] = [];
			for (let x = 0; x < this.size.x; x++) {
				row.push(new Cell(x, y));
			}
			this.cells.push(row);
		}
	}

	public markCell(cell: Cell) {
		switch (cell.state) {
			case stateCell.CLOSE:
				if (this.countFlags > 0) {
					cell.state = stateCell.FLAG;
					this.countFlags = this.countFlags - 1;
				}
				break;
			case stateCell.FLAG:
				cell.state = stateCell.QUEST;
				this.countFlags = this.countFlags + 1;
				break;
			case stateCell.QUEST:
				cell.state = stateCell.CLOSE;
				break;
			default:
				break;
		}
	}

	public getCell(x: number, y: number) {
		return this.cells[y][x];
	}

	public getCopyBoard(): Board {
		const newBoard = new Board();
		newBoard.cells = this.cells;
		newBoard.size = this.size;
		newBoard.countMine = this.countMine;
		newBoard.countFlags = this.countFlags;
		newBoard.openedCell = this.openedCell;
		return newBoard;
	}

	public placeMines(targetX: number, targetY: number) {
		for (let i = 0; i < this.countMine; i++) {
			const { x, y } = getRandomPos(this.size.x, this.size.y);
			const cell = this.getCell(x, y);
			if (!cell.containMine || (x !== targetX && y !== targetY)) {
				cell.putMine();
				// increase the number of nearby mines
				this.getCellAround(x, y).forEach((el) => el?.changesMinesNearby());
			} else {
				i = i - 1;
			}
		}
	}

	public getCellAround(x: number, y: number) {
		const cellAround: Cell[] = [];
		for (let newY = y - 1; newY < y + 2; newY++) {
			if (newY >= 0 && newY < this.size.y) {
				cellAround.push(
					this.getCell(x - 1, newY),
					this.getCell(x, newY),
					this.getCell(x + 1, newY)
				);
			}
		}
		return cellAround;
	}

	public openCell(x: number, y: number) {
		if (this.openedCell === 0) {
			this.placeMines(x, y);
		}
		const cell = this.getCell(x, y);

		cell.openCell();
		this.openedCell = this.openedCell + 1;
		// open nearby cell
		if (cell.minesNearby === 0) {
			this.getCellAround(x, y).forEach((el) => {
				if (el && el.state === stateCell.CLOSE) {
					this.openCell(el.x, el.y);
				}
			});
		}
	}
}
