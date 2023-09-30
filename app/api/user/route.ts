import {AxiosResponse, isAxiosError} from "axios";
import axiosInstance from "config/server/axios";
import {NextRequest, NextResponse} from "next/server";

import {CreateUserPayload} from "@/types/CreateUserPayload";
import {CreateUserResponse} from "@/types/CreateUserResponse";
import {UserCollectionResponse} from "@/types/UserCollectionResponse";

export async function GET(req: NextRequest) {
	const searchParams = req.url.split("?");

	let url = process.env.API_BFF_URL + "/api/v1/users-dashboard/get";

	if (searchParams.length === 2) {
		url = url + "?" + searchParams[1];
	}

	try {
		const apiResponse: AxiosResponse<UserCollectionResponse> =
			await axiosInstance.get(url);

		const res = NextResponse.json(apiResponse.data, {
			status: apiResponse.status,
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

export async function POST(req: NextRequest) {
	try {
		const token = req.cookies.get("TOKEN");
		const requestData: CreateUserPayload = await req.json();

		const apiResponse: AxiosResponse<CreateUserResponse> =
			await axiosInstance.post("/api/v1/users-dashboard", requestData);

		const res = NextResponse.json(apiResponse.data, {
			status: apiResponse.status,
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
