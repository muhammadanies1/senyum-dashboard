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
			const errorResponse = JSON.parse(await apiResponse.text());
			return NextResponse.json(errorResponse, {status: apiResponse.status});
		}

		const data: LoginResponse = await apiResponse.json();

		console.log(
			JSON.stringify({
				status: apiResponse.ok,
				url: apiResponse.url,
				body: requestData,
				data,
			}),
		);

		const res = NextResponse.json(data, {
			status: apiResponse.status,
		});

		res.cookies.set({
			name: "TOKEN",
			value: data.data.accessToken,
			path: "/",
		});

		res.cookies.set({
			name: "REFRESH_TOKEN",
			value: data.data.accessToken,
			path: "/",
		});

		return res;
	} catch (error) {
		throw error;
	}
}
