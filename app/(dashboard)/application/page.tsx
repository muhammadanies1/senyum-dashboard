import {cookies} from "next/headers";
import {FunctionComponent} from "react";

import {userTypeID} from "@/types/UserTypeID";

import ApplicationTable from "./_components/Table";

const Application: FunctionComponent = () => {
	const cookieStore = cookies();

	let userType: userTypeID | undefined;

	if (cookieStore.get("USER_TYPE_ID")?.value) {
		userType = cookieStore.get("USER_TYPE_ID")?.value as userTypeID;
	} else {
		userType = "VIEWER";
	}

	return <ApplicationTable userTypeId={userType} />;
};

export default Application;
