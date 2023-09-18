import Link from "next/link";
import React, {FunctionComponent, HTMLAttributes} from "react";

import Avatar from "@/components/atoms/Avatar";

type NavbarMenuProps = HTMLAttributes<HTMLDivElement> & {
	userName?: string;
	isExpand?: boolean;
};

const NavbarMenu: FunctionComponent<NavbarMenuProps> = ({
	className,
	isExpand,
	...attrs
}) => {
	return (
		<div
			className={"navbar-menu"
				.concat(!isExpand ? " collapsed" : "")
				.concat(className ? ` ${className}` : "")}
			{...attrs}
		>
			<Link
				href="#"
				title="Notifikasi"
				className="flex gap-2 items-center w-full lg:w-auto"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M12 2C8.16566 2 5.05732 4.86538 5.05732 8.4V11.4877C5.05732 12.2426 4.72353 12.9744 4.14449 13.5082C2.78607 14.7604 3.71363 16.9333 5.63472 16.9333H18.3652C20.2864 16.9333 21.2139 14.7604 19.8555 13.5082C19.2765 12.9744 18.9426 12.2426 18.9426 11.4877V8.4C18.9426 4.86538 15.8343 2 12 2Z"
						fill="#777777"
					/>
					<path
						d="M10.5537 19.0667C10.5537 18.6249 10.1651 18.2667 9.68586 18.2667C9.20657 18.2667 8.81803 18.6249 8.81803 19.0667C8.81803 20.6867 10.2427 22 12.0001 22C13.7575 22 15.1821 20.6867 15.1821 19.0667C15.1821 18.6249 14.7936 18.2667 14.3143 18.2667C13.835 18.2667 13.4465 18.6249 13.4465 19.0667C13.4465 19.8031 12.799 20.4 12.0001 20.4C11.2012 20.4 10.5537 19.8031 10.5537 19.0667Z"
						fill="#777777"
					/>
				</svg>
				<span className="font-medium text-dark-40 text-base lg:hidden">
					Notifikasi
				</span>
			</Link>
			<Link
				href="#"
				className="flex items-center gap-2 w-full lg:w-auto"
				title="Profile"
			>
				<span className="font-medium text-dark-40 text-base order-2 lg:order-1">
					John Doe
				</span>
				<Avatar
					name="John Doe Tes"
					title="John Doe Avatar"
					className="order-1 lg:order-2"
				/>
				<svg
					className="order-3"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M3.49904 6.82658C3.71755 6.61118 4.0693 6.6137 4.28469 6.83221L9.31556 11.9357C9.69211 12.3177 10.3082 12.3177 10.6848 11.9357L15.7156 6.83221C15.931 6.6137 16.2828 6.61118 16.5013 6.82658C16.7198 7.04197 16.7223 7.39372 16.5069 7.61223L11.4761 12.7157C10.6643 13.5392 9.33599 13.5392 8.52427 12.7157L3.49341 7.61223C3.27801 7.39372 3.28053 7.04197 3.49904 6.82658Z"
						fill="#777777"
					/>
				</svg>
			</Link>
		</div>
	);
};

export default NavbarMenu;
