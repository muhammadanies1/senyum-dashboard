import React, {ButtonHTMLAttributes} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary";
	bordered?: boolean;
	size?: "sm" | "md" | "lg";
};

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
	const {
		size = "md",
		variant = "primary",
		bordered,
		className,
		...attrs
	} = props;

	return (
		<button
			className={"btn"
				.concat(variant ? ` ${variant}` : "")
				.concat(size ? ` ${size}` : "")
				.concat(bordered ? ` bordered` : "")}
			{...attrs}
			ref={ref}
		/>
	);
});

Button.displayName = "Button";

export default Button;
