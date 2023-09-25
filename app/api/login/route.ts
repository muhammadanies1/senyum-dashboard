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
		const apiResponse = await fetch(
			process.env.API_BFF_URL + "/api/v1/users-dashboard/login",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			},
		);

		if (!apiResponse.ok) {
			const errorResponse = await apiResponse.json();
			return NextResponse.json(errorResponse, {status: 400});
		}

		const data: LoginResponse = await apiResponse.json();

		const res = NextResponse.json(data, {
			status: apiResponse.status,
		});

		res.cookies.set({
			name: "TOKEN",
			value: `TOKEN=${data.data.accessToken}`,
			path: "/",
		});

		res.cookies.set({
			name: "REFRESH_TOKEN",
			value: `TOKEN=${data.data.accessToken}`,
			path: "/",
		});

		return res;
	} catch (error) {
		throw error;
	}
}
