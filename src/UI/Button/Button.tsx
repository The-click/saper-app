import React from "react";
import { classNames } from "../../helpers/classNames";
import cls from "./Button.module.css";

export enum BtnTheme {
	CLEAR = "clear",
}
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme: BtnTheme;
}

export const Button: React.FC<ButtonProps> = (props) => {
	const { className, theme, children, ...otherProps } = props;

	return (
		<button className={classNames(cls.button, {}, [cls[theme]])} {...otherProps}>
			{children}
		</button>
	);
};
