import React from "react";
import { classNames } from "../../helpers/classNames";
import cls from "./SmileImg.module.css";

interface SmileImgProps {
	className?: string;
	smileType: SmileType;
}

export enum SmileType {
	DEF = "def",
	AFRAID = "afraid",
	PRESS = "press",
	COOL = "cool",
	DEATH = "death",
}

export const SmileImg: React.FC<SmileImgProps> = (props) => {
	const { className, smileType } = props;

	return (
		<div className={classNames(cls.sprite_smile, {}, [cls["sprite_smile_" + smileType]])}></div>
	);
};
