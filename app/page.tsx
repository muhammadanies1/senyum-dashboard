import React from "react";

import Filter from "../components/atoms/Filter";
import ModalAddUser from "./modal-add-user";

export default function Page() {
	return (
		<React.Fragment>
			<h1>Hello, Next.js!</h1>
			<ModalAddUser />
			{/* <Sidebar /> */}
			<Filter className="bg-primary-10">Filter</Filter>
		</React.Fragment>
	);
}
