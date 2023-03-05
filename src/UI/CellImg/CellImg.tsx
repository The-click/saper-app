import React from "react";
import { classNames } from "../../helpers/classNames";
import { stateCell } from "../../models/Cell";
import cls from "./CellImg.module.css";

interface CellImgProps {
	className?: string;
	cellType: CellType | stateCell;
}

export enum CellType {
	CLOSE = "close",
	OPEN = "open",
	FLAG = "flag",
	QUEST = "quest",
	QUEST_PRESS = "quest_press",
	BOMB = "bomb",
	BOMB_RED = "bomb_red",
	BOMB_CROSS = "bomb_cross",
}

export const CellImg: React.FC<CellImgProps> = (props) => {
	const { className, cellType } = props;

	return (
		<div className={classNames(cls.sprite_cell, {}, [cls["sprite_cell_" + cellType]])}></div>
	);
};
