import React from "react";
import { classNames } from "../../helpers/classNames";
import cls from "./Loader.module.css";

interface LoaderProps {
	className?: string;
}

export const Loader: React.FC<LoaderProps> = (props) => {
	const { className } = props;

	return <span className={classNames(cls.loader, {}, [])}></span>;
};
