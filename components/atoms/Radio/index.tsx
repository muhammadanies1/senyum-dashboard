import React, {ButtonHTMLAttributes, useMemo} from "react";

type Props = ButtonHTMLAttributes<HTMLInputElement> & {
	radioContainerStyle?: React.CSSProperties;
	radioOuterCircleClassName?: string;
	radioInnerCircleClassName?: string;
	className?: string;
	disabled?: boolean;
	checked?: boolean;
	label?: string;
};

const Radio = React.forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
	const {
		radioOuterCircleClassName,
		radioInnerCircleClassName,
		radioContainerStyle,
		className,
		disabled,
		checked,
		label,
		style,
		...attrs
	} = props;

	const outerCircleColor = useMemo(() => {
		if (checked && disabled) {
			return "#E5E5E5";
		} else if (!checked && disabled) {
			return "#FCFCFC";
		} else if (checked && !disabled) {
			return "#C4D4E3";
		} else {
			return "#FCFCFC";
		}
	}, [checked, disabled]);

	const outerCircleBorderColor = useMemo(() => {
		if (disabled) {
			return "#E5E5E580";
		} else {
			return "#A3A3A3";
		}
	}, [disabled]);

	const innerCircleColor = useMemo(() => {
		if (!checked) return "transparent";
		if (disabled) {
			return "#808080";
		} else {
			return "#0051A0";
		}
	}, [checked, disabled]);

	return (
		<label
			className={`relative cursor-pointer select-none flex pl-8 font-semibold`.concat(
				className ? " " + className : "",
			)}
			style={style}
		>
			{label}
			<input
				disabled={disabled}
				type="radio"
				className={`absolute top-0 left-0 h-0 w-0 appearance-none`}
				{...attrs}
				ref={ref}
			/>
			<span
				className={`absolute top-0 left-0 h-6 w-6 rounded-full`
					.concat(!checked ? " border" : "")
					.concat(
						radioOuterCircleClassName ? " " + radioOuterCircleClassName : "",
					)}
				style={{
					backgroundColor: outerCircleColor,
					borderColor: outerCircleBorderColor,
					...radioContainerStyle,
				}}
			></span>
			<span
				className={`h-4 w-4 absolute top-1 left-1 rounded-full`.concat(
					radioInnerCircleClassName ? " " + radioInnerCircleClassName : "",
				)}
				style={{backgroundColor: innerCircleColor}}
			></span>
		</label>
	);
});

Radio.displayName = "Radio";

export default Radio;
