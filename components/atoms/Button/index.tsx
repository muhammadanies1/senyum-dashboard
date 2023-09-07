"use client";

import React, {ButtonHTMLAttributes, useMemo, useState} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "primary-outline" | "secondary" | "secondary-outline";
	size?: "sm" | "md" | "lg";
};

// eslint-disable-next-line react/display-name
const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
	const {
		disabled,
		size = "md",
		variant = "primary",
		onMouseOver,
		onMouseLeave,
		onClick,
		style,
		className,
		...attrs
	} = props;

	const [isHover, setIsHover] = useState(false);
	const [isFocus, setIsFocus] = useState(false);

	const buttonSize = useMemo(() => {
		switch (size) {
			case "sm":
				return "h-8";
			case "md":
				return "h-10";
			default:
				return "h-12";
		}
	}, [size]);

	const backgroundColor = useMemo(() => {
		switch (variant) {
			case "primary":
				if (disabled) {
					return "#D3D4D4";
				} else {
					if (isHover) {
						return "#138CEC";
					} else {
						return "#1078CA";
					}
				}
			case "primary-outline":
				return "transparent";
			case "secondary":
				if (disabled) {
					return "#D3D4D4";
				} else {
					if (isHover) {
						return "#FC9641";
					} else {
						return "#F87304";
					}
				}
			case "secondary-outline":
				return "transparent";
		}
	}, [variant, disabled, isHover]);

	const borderColor = useMemo(() => {
		if (disabled) {
			return "#777777";
		}
		switch (variant) {
			case "primary":
				if (isFocus) {
					return "#9ACEF7";
				}
				return "#1078CA";
			case "primary-outline":
				if (isHover) {
					return "#1078CA";
				} else {
					return "#1078CA";
				}
			case "secondary":
				if (isFocus) {
					return "#D16104";
				}
				return "#F87304";
			case "secondary-outline":
				if (isHover) {
					return "#F87304";
				} else {
					return "#F87304";
				}
		}
	}, [variant, disabled, isHover, isFocus]);

	const borderWidth = useMemo(() => {
		if (isFocus) {
			return 2;
		}
		switch (variant) {
			case "primary-outline":
			case "secondary-outline":
				return 1;
			default:
				return 0;
		}
	}, [variant, isFocus]);

	const textSize = useMemo(() => {
		if (size === "sm") {
			return "text-xs";
		} else if (size === "md") {
			return "text-sm";
		} else {
			return "text-base";
		}
	}, [size]);

	const textColor = useMemo(() => {
		switch (variant) {
			case "primary":
				if (disabled) {
					return "#777777";
				} else {
					return "#FFFFFF";
				}
			case "primary-outline":
				if (disabled) {
					return "#777777";
				} else {
					if (isHover) {
						return "#1078CA";
					} else {
						return "#1078CA";
					}
				}
			case "secondary":
				if (disabled) {
					return "#777777";
				} else {
					return "#FFFFFF";
				}
			case "secondary-outline":
				if (disabled) {
					return "#777777";
				} else {
					if (isHover) {
						return "#F87304";
					} else {
						return "#F87304";
					}
				}
		}
	}, [variant, disabled, isHover]);

	const padding = useMemo(() => {
		switch (size) {
			case "sm":
				return "p-2";
			case "md":
				return "py-2 px-3";
			default:
				return "p-3";
		}
	}, [size]);

	return (
		<button
			disabled={disabled}
			onMouseOver={(e) => {
				setIsHover(true);

				if (!onMouseOver) return;

				onMouseOver(e);
			}}
			onMouseLeave={(e) => {
				setIsHover(false);

				if (!onMouseLeave) return;

				onMouseLeave(e);
			}}
			onClick={(e) => {
				setIsFocus(!isFocus);

				if (!onClick) return;

				onClick(e);
			}}
			className={"rounded-lg font-semibold "
				.concat(textSize ? " " + textSize + " " + padding : "")
				.concat(buttonSize ? " " + buttonSize : "")
				.concat(
					variant === "primary-outline" || variant === "secondary-outline"
						? " border"
						: "",
				)
				.concat(className ? " " + className : "")}
			style={{
				borderColor,
				backgroundColor,
				color: textColor,
				borderWidth,
				...style,
			}}
			{...attrs}
			ref={ref}
		/>
	);
});

export default Button;
