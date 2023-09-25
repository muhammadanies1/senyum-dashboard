import {FunctionComponent, HTMLAttributes} from "react";

import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type FormIconProps = HTMLAttributes<HTMLDivElement> & {
	icon: IconProp;
	iconWrapperTag?: keyof JSX.IntrinsicElements;
	onClickIcon?: () => void;
};

const FormIcon: FunctionComponent<FormIconProps> = ({
	icon,
	iconWrapperTag: IconWrapperTag = "span",
	onClickIcon,
	className,
	children,
	...attrs
}) => {
	return (
		<div
			className={"form-icon-wrapper".concat(className ? ` ${className}` : "")}
			{...attrs}
		>
			{children}
			{/* @ts-ignore */}
			<IconWrapperTag
				className="icon-wrapper"
				{...(IconWrapperTag === "button" && {type: "button"})}
				onClick={onClickIcon}
			>
				<FontAwesomeIcon icon={icon} />
			</IconWrapperTag>
		</div>
	);
};

export default FormIcon;
