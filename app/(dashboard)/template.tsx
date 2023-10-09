export const dynamic = "auto";

import {cookies} from "next/headers";
import {Fragment, FunctionComponent} from "react";

import Navbar from "@/components/molecules/Navbar";

import ClientSidebarMenu from "./client-sidebar-menu";

interface AdminTemplateProps {
	children: React.ReactNode;
}

const AdminTemplate: FunctionComponent<AdminTemplateProps> = ({children}) => {
	const cookieStore = cookies();
	const TOKEN = cookieStore.get("TOKEN")?.value;
	const name = cookieStore.get("NAME")?.value;

	return (
		<Fragment>
			<Navbar isLoggedIn={!!TOKEN} name={name} />
			<div className="wrapper">
				<div className="inner-wrapper">
					<div className="py-4">
						<ClientSidebarMenu />
					</div>
					<div className="w-full p-4">{children}</div>
				</div>
			</div>
		</Fragment>
	);
};

export default AdminTemplate;
