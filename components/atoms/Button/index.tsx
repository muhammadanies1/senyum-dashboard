"use client";

import React, {ButtonHTMLAttributes, useMemo, useState} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "primary-outline";
	size?: "sm" | "md";
};

// eslint-disable-next-line react/display-name
const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
	const {
		disabled,
		size = "md",
		variant = "primary",
		onMouseOver,
		onMouseLeave,
		style,
		className,
		...attrs
	} = props;

	const [isHover, setIsHover] = useState(false);

	const buttonSize = useMemo(() => {
		switch (size) {
			case "sm":
				return "h-8";
			default:
				return "h-14";
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
		}
	}, [variant, disabled, isHover]);

	const borderColor = useMemo(() => {
		switch (variant) {
			case "primary":
				return "#1078CA";
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
		}
	}, [variant, disabled, isHover]);

	const textSize = useMemo(() => {
		if (size === "sm") {
			return "text-sm";
		}
		return "text-base";
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
		}
	}, [variant, disabled, isHover]);

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
			className={"rounded font-semibold px-6"
				.concat(textSize ? " " + textSize : "")
				.concat(buttonSize ? " " + buttonSize : "")
				.concat(variant === "primary-outline" ? " border" : "")
				.concat(className ? " " + className : "")}
			style={{borderColor, backgroundColor, color: textColor, ...style}}
			{...attrs}
			ref={ref}
		/>
	);
});

export default Button;
