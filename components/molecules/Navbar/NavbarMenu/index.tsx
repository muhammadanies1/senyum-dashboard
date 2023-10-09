"use client";

import "./style.css";

import Link from "next/link";
import React, {
	Fragment,
	FunctionComponent,
	HTMLAttributes,
	useCallback,
	useContext,
	useState,
} from "react";

import Avatar from "@/components/atoms/Avatar";

import {NavbarContext} from "../";
import Dropdown from "../../Dropdown";
import LogoutConfirmationModal from "./LogoutConfirmationModal";

type NavbarMenuProps = HTMLAttributes<HTMLDivElement>;

const NavbarMenu: FunctionComponent<NavbarMenuProps> = ({
	className,
	...attrs
}) => {
	const {isExpand, name} = useContext(NavbarContext);

	const [isShowConfirmation, setIsShowConfirmation] = useState<boolean>(false);

	const handleLogout = useCallback(() => {
		document.cookie = `TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		document.cookie = `REFRESH_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		document.cookie = `USER_TYPE_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		document.cookie = `NAME=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		window.location.href = "/login";
	}, []);

	return (
		<Fragment>
			<div
				className={"navbar-menu"
					.concat(!isExpand ? " collapsed" : "")
					.concat(className ? ` ${className}` : "")}
				{...attrs}
			>
				<Link
					href="#"
					title="Notifikasi"
					className="flex gap-2 items-center w-full lg:w-auto text-light-80"
				>
					<i className="fas fa-bell fa-lg"></i>
					<span className="font-medium text-dark-40 text-base lg:hidden">
						Notifikasi
					</span>
				</Link>
				<Dropdown
					id="profile-dropdown"
					data-testid="profile-dropdown"
					className="profile-dropdown"
					label={
						<div className="flex gap-2 items-center w-full lg:w-auto text-light-80">
							<span className="font-medium text-dark-40 text-base order-2 lg:order-1">
								{name}
							</span>
							<Avatar
								name={name || ""}
								title={name}
								className="order-1 lg:order-2"
							/>
							<i className="fas fa-chevron-down order-3"></i>
						</div>
					}
					menus={[
						{
							label: "Logout",
							onClick: () => {
								setIsShowConfirmation(true);
							},
						},
					]}
				/>
			</div>

			<LogoutConfirmationModal
				isShow={isShowConfirmation}
				handleClose={() => setIsShowConfirmation((state) => !state)}
				handleLogout={handleLogout}
			/>
		</Fragment>
	);
};

export default NavbarMenu;
