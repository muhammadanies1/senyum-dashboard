import React, {InputHTMLAttributes} from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	variant?: "error";
};

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
	const {className, variant, ...attrs} = props;
	return (
		<input
			className={"input"
				.concat(variant === "error" ? " error" : "")
				.concat(className ? " " + className : "")}
			{...attrs}
			ref={ref}
		/>
	);
});

Input.displayName = "Input";

export default Input;
