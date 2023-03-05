import React from "react";
import cls from "./BoardComponent.module.css";
import { Board, TypeBoard, paramBoard } from "../../models/Board";
import { Cell, stateCell } from "../../models/Cell";
import { CellComponent } from "../Cell/CellComponent";
import { Loader } from "../Loader/Loader";

interface BoardComponentProps {
	pressCell: Cell | null;
	setPressCell: React.Dispatch<React.SetStateAction<Cell | null>>;
	board: Board | undefined;
	updateBoard: () => void;
	isWin: boolean | null;
	setIsWin: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const BoardComponent: React.FC<BoardComponentProps> = (props) => {
	const { pressCell, setPressCell, board, updateBoard, setIsWin, isWin } = props;
	const boardRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		boardRef.current?.style.setProperty("--size-board", `${board?.size.x || 0}`);
	}, [board]);

	function selectCell(e: React.MouseEvent<HTMLDivElement>) {
		if (e.button !== 0 || isWin !== null) return;
		const dataCell = (e.target as Element).parentElement?.dataset;
		if (dataCell?.x && dataCell?.y) {
			const targetCell = board?.getCell(+dataCell.x, +dataCell.y);
			targetCell?.state === stateCell.CLOSE && setPressCell(targetCell || null);
		}
	}
	function changeSelectCell(e: React.MouseEvent<HTMLDivElement>) {
		if (pressCell && isWin === null) {
			selectCell(e);
		}
	}
	function removeSelectCell() {
		if (isWin === null) {
			setPressCell(null);
		}
	}

	if (!board) {
		return <Loader />;
	}
	return (
		<div
			className={cls.field}
			ref={boardRef}
			onMouseDown={selectCell}
			onMouseMove={changeSelectCell}
			onMouseLeave={removeSelectCell}
			onDragStart={(e) => e.preventDefault()}>
			{board?.cells.map((row: Cell[], index: number) => (
				<React.Fragment key={index}>
					{row.map((cell) => (
						<CellComponent
							key={cell.id}
							cell={cell}
							board={board}
							updateBoard={updateBoard}
							pressCell={pressCell}
							setPressCell={setPressCell}
							isWin={isWin}
							setIsWin={setIsWin}
						/>
					))}
				</React.Fragment>
			))}
		</div>
	);
};
