import {cookies} from "next/headers";
import {FunctionComponent} from "react";

import {userTypeID} from "@/types/UserTypeID";

import UserTable from "./_components/Table";

const Admin: FunctionComponent = () => {
	const cookieStore = cookies();

	let userType: userTypeID | undefined;

	if (cookieStore.get("USER_TYPE")?.value) {
		userType = cookieStore.get("USER_TYPE")?.value as userTypeID;
	} else {
		userType = "VIEWER";
	}

	return <UserTable userTypeId={userType} />;
};

export default Admin;
