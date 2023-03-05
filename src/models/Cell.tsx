export enum stateCell {
	CLOSE = "close",
	FLAG = "flag",
	QUEST = "quest",
	OPEN = "open",
}

export class Cell {
	readonly x: number;
	readonly y: number;
	readonly id: string;
	state: stateCell;
	minesNearby: number;
	containMine: boolean;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.id = x + "_" + y;
		this.state = stateCell.CLOSE;
		this.minesNearby = 0;
		this.containMine = false;
	}

	public changesMinesNearby() {
		this.minesNearby = this.minesNearby + 1;
	}

	public putMine() {
		this.containMine = true;
	}

	public openCell() {
		this.state = stateCell.OPEN;
	}
}
