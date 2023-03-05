import React from "react";

import cls from "./NumImg.module.css";
import { classNames } from "../../helpers/classNames";

interface NumImgProps {
	className?: string;
	value: string;
}

export const NumImg: React.FC<NumImgProps> = (props) => {
	const { className, value } = props;

	const numAnswer = value.split("").map((el) => {
		return <div className={classNames(cls.sprite_num, {}, [cls["sprite_num_" + el]])} />;
	});

	return <div className={className}>{numAnswer}</div>;
};
