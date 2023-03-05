import React from "react";
import { classNames } from "../../helpers/classNames";
import { Board, TypeBoard } from "../../models/Board";
import { Cell } from "../../models/Cell";
import { BoardComponent } from "../Board/BoardComponent";
import { Panel } from "../Panel/Panel";
import cls from "./Main.module.css";

interface MainProps {
	className?: string;
}

export const Main: React.FC<MainProps> = (props) => {
	const { className } = props;
	const [pressCell, setPressCell] = React.useState<Cell | null>(null);
	const [board, setBoard] = React.useState<Board>();
	const [isWin, setIsWin] = React.useState<boolean | null>(null);
	const [countAllCell, setCountAllCell] = React.useState<number>(0);

	React.useEffect(() => {
		startGame();
	}, []);

	function startGame() {
		const newBoard = new Board();
		newBoard.initCells(TypeBoard.MEDIUM);
		setCountAllCell(newBoard.size.x * newBoard.size.y - newBoard.countMine);
		setBoard(newBoard);
		setIsWin(null);
	}

	function updateBoard() {
		const newBoard = board?.getCopyBoard();
		setBoard(newBoard);
		if (newBoard?.openedCell === countAllCell) {
			setIsWin(true);
		}
	}

	return (
		<div className={classNames(cls.main, {}, [])}>
			<Panel pressCell={pressCell} board={board} startGame={startGame} isWin={isWin} />
			<BoardComponent
				setPressCell={setPressCell}
				pressCell={pressCell}
				board={board}
				updateBoard={updateBoard}
				isWin={isWin}
				setIsWin={setIsWin}
			/>
		</div>
	);
};
