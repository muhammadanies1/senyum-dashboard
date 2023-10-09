import {cookies} from "next/headers";
import {Fragment, FunctionComponent} from "react";

import Navbar from "@/components/molecules/Navbar";

import ClientSidebarMenu from "./client-sidebar-menu";

interface AdminTemplateProps {
	children: React.ReactNode;
}

const AdminTemplate: FunctionComponent<AdminTemplateProps> = ({children}) => {
	const cookieStore = cookies();
	const TOKEN = cookieStore.get("TOKEN");
	const name = cookieStore.get("NAME");

	return (
		<Fragment>
			<Navbar isLoggedIn={!!TOKEN?.value} name={name?.value} />
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
