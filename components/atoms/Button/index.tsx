import React, {ButtonHTMLAttributes} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary" | "danger";
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
				.concat(size ? ` ${size}` : "")
				.concat(bordered ? ` bordered` : "")
				.concat(transparent ? " transparent" : "")}
			{...attrs}
			ref={ref}
		/>
	);
});

Button.displayName = "Button";

export default Button;
