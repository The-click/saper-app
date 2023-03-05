import React from "react";
import { addPrefix } from "../../helpers/addPrefix";
import { classNames } from "../../helpers/classNames";
import { Cell } from "../../models/Cell";
import { BtnTheme, Button } from "../../UI/Button/Button";
import { NumImg } from "../../UI/NumImg/NumImg";
import { SmileImg, SmileType } from "../../UI/SmileImg/SmileImg";
import cls from "./Panel.module.css";
import { Board } from "../../models/Board";

interface PanelProps {
	className?: string;
	pressCell: Cell | null;
	board: Board | undefined;
	startGame: () => void;
	isWin: boolean | null;
}

export const Panel: React.FC<PanelProps> = (props) => {
	const { className, pressCell, board, startGame, isWin } = props;
	const [pressSmile, setPressSmile] = React.useState<boolean>(false);
	const [timer, setTimer] = React.useState(0);
	const timerIdRef = React.useRef<NodeJS.Timeout | null>(null);

	function restart() {
		setPressSmile(false);
		setTimer(0);
		startGame();
	}

	function tick() {
		if (isWin !== null) {
			if (timerIdRef.current) {
				clearInterval(timerIdRef.current);
			}
		} else {
			setTimer((prev) => prev + 1);
		}
	}

	function startTimer() {
		if (board && board.openedCell > 0 && timerIdRef.current === null) {
			timerIdRef.current = setInterval(tick, 1000);
		}

		if (isWin !== null || board?.openedCell === 0) {
			clearInterval(timerIdRef.current || 0);
			timerIdRef.current = null;
		}
	}

	React.useEffect(() => {
		startTimer();
	}, [board?.openedCell, isWin]);

	const typeSmileMemo = React.useMemo(() => {
		if (isWin) {
			return SmileType.COOL;
		}
		if (isWin === false) {
			return SmileType.DEATH;
		}
		if (pressSmile) {
			return SmileType.PRESS;
		}
		if (pressCell) {
			return SmileType.AFRAID;
		}
		return SmileType.DEF;
	}, [board, pressCell, pressSmile]);

	return (
		<div className={classNames(cls.panel, {}, [])}>
			<div className={classNames(cls.count_mines, {}, [cls.numbers_bg])}>
				<NumImg value={addPrefix(isWin ? 0 : board?.countFlags || 0)} />
			</div>
			<Button
				theme={BtnTheme.CLEAR}
				onClick={restart}
				onMouseDown={() => setPressSmile(true)}
				onMouseLeave={() => setPressSmile(false)}>
				<SmileImg smileType={typeSmileMemo} />
			</Button>
			<div className={classNames(cls.timer, {}, [cls.numbers_bg])}>
				<NumImg value={addPrefix(timer)} />
			</div>
		</div>
	);
};
