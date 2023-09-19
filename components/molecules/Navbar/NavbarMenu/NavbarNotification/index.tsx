import Image from "next/image";
import React, {ButtonHTMLAttributes} from "react";
import NotificationIcon from "./notification-icon.svg";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const NavbarNotification = (props: Props) => {
	const {className, ...attrs} = props;

	return (
		<button
			className={"cursor-pointer".concat(className ? " " + className : "")}
			{...attrs}
		>
			<Image src={NotificationIcon} alt="Notification icon" />
		</button>
	);
};

export default NavbarNotification;
