"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {FunctionComponent} from "react";

import Sidebar from "@/components/molecules/Sidebar";
import SidebarMenu from "@/components/molecules/SidebarMenu";

const ClientSidebarMenu: FunctionComponent = () => {
	const pathname = usePathname();

	return (
		<Sidebar>
			<Link href="/">
				<SidebarMenu isActive={pathname === "/application"}>
					<i className="fa-solid fa-file"></i>
					<span>Pengajuan Simpedes UMi</span>
				</SidebarMenu>
			</Link>
			<Link href="/admin">
				<SidebarMenu isActive={pathname === "/admin"}>
					<i className="fa-solid fa-user-group"></i>
					<span>Tabel User</span>
				</SidebarMenu>
			</Link>
		</Sidebar>
	);
};

export default ClientSidebarMenu;
