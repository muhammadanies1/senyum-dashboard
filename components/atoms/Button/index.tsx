import React, {ButtonHTMLAttributes} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary" | "danger" | "primary-outline";
	size?: "sm" | "md" | "lg";
	transparent?: boolean;
	bordered?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
	const {
		variant = "primary",
		size = "md",
		transparent,
		className,
		bordered,
		...attrs
	} = props;

	return (
		<button
			className={"btn"
				.concat(variant ? ` ${variant}` : "")
				.concat(size === "sm" ? " sm" : "")
				.concat(size === "md" ? " md" : "")
				.concat(size === "lg" ? " lg" : "")
				.concat(bordered ? ` bordered` : "")
				.concat(transparent ? " transparent" : "")
				.concat(className ? ` ${className}` : "")}
			{...attrs}
			ref={ref}
		/>
	);
});

Button.displayName = "Button";

export default Button;
