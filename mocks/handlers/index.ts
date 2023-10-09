import {loginSuccess} from "./auth";
import {createUserSuccess, deleteUserSuccess, updateUserSuccess} from "./user";

export const handlers = [
	createUserSuccess,
	updateUserSuccess,
	deleteUserSuccess,
	loginSuccess,
];
