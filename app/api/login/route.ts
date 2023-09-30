import {AxiosResponse, isAxiosError} from "axios";
import axiosInstance from "config/server/axios";
import {NextResponse} from "next/server";

import {ApiResponse} from "@/types/ApiResponse";

export type LoginPayload = {
	username: string;
	password: string;
};

export type ResponseData = {
	accessToken: string;
	refreshToken: string;
};

export type LoginResponse = ApiResponse<ResponseData>;

export async function POST(request: Request) {
	try {
		const requestData: LoginPayload = await request.json();
		const apiResponse: AxiosResponse<LoginResponse> = await axiosInstance.post(
			"/api/v1/users-dashboard/login",
			requestData,
		);

		const res = NextResponse.json(apiResponse.data, {
			status: apiResponse.status,
		});

		res.cookies.set({
			name: "TOKEN",
			value: apiResponse.data.data.accessToken,
			path: "/",
		});

		res.cookies.set({
			name: "REFRESH_TOKEN",
			value: apiResponse.data.data.refreshToken,
			path: "/",
		});

		return res;
	} catch (error) {
		if (isAxiosError(error)) {
			return NextResponse.json(error, {
				status: error.response?.status,
			});
		}
	}
}
