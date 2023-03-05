import React from "react";

import cls from "./CountImg.module.css";
import { classNames } from "../../helpers/classNames";

interface CountImgProps {
	className?: string;
	value: number;
}

export const CountImg: React.FC<CountImgProps> = (props) => {
	const { className, value } = props;

	return <div className={classNames(cls.sprite_count, {}, [cls["sprite_count_" + value]])}></div>;
};
