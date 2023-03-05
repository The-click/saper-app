import React from "react";
import { Cell, stateCell } from "../../models/Cell";
import cls from "./CellComponent.module.css";
import { CellImg, CellType } from "../../UI/CellImg/CellImg";
import { Board } from "../../models/Board";
import { CountImg } from "../../UI/CountImg/CountImg";

interface CellComponentProps {
	cell: Cell;
	board: Board;
	updateBoard: () => void;
	pressCell: Cell | null;
	setPressCell: React.Dispatch<React.SetStateAction<Cell | null>>;
	isWin: boolean | null;
	setIsWin: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const CellComponent: React.FC<CellComponentProps> = (props) => {
	const { cell, board, updateBoard, pressCell, setPressCell, isWin, setIsWin } = props;
	const typeCellMemo = React.useMemo(() => getTypeCell(), [cell.state, pressCell, isWin]);
	function clickToOpenCell() {
		if (isWin !== null) return;
		if (cell.id === pressCell?.id && cell.state === stateCell.CLOSE) {
			if (cell.containMine) {
				setIsWin(false);
			} else {
				setPressCell(null);
				board.openCell(cell.x, cell.y);
			}
			updateBoard();
		}
	}

	function makeMark(e: React.MouseEvent<HTMLElement>) {
		if (isWin !== null) return;
		e.preventDefault();
		board.markCell(cell);
		updateBoard();
		return false;
	}

	function getTypeCell() {
		if (isWin) {
			if (cell.containMine) {
				return <CellImg cellType={CellType.FLAG} />;
			}
		}
		if (isWin === false) {
			if (cell.containMine && cell.id === pressCell?.id) {
				return <CellImg cellType={CellType.BOMB_RED} />;
			}
			if (cell.containMine && cell.state === stateCell.FLAG) {
				return <CellImg cellType={CellType.BOMB_CROSS} />;
			}
			if (cell.containMine) {
				return <CellImg cellType={CellType.BOMB} />;
			}
		}
		if (cell.state === stateCell.OPEN) {
			if (cell.minesNearby > 0) {
				return <CountImg value={cell.minesNearby} />;
			} else {
				return <CellImg cellType={cell.state} />;
			}
		}
		if (pressCell && pressCell.id === cell.id) {
			return <CellImg cellType={CellType.OPEN} />;
		}
		return <CellImg cellType={cell.state} />;
	}

	return (
		<div
			className={cls.cell}
			onClick={clickToOpenCell}
			data-y={cell.y}
			data-x={cell.x}
			onContextMenu={makeMark}
			onMouseUp={clickToOpenCell}>
			{typeCellMemo}
		</div>
	);
};
