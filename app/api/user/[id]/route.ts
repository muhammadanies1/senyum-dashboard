import {AxiosResponse, isAxiosError} from "axios";
import {NextRequest, NextResponse} from "next/server";

import axiosInstance from "@/config/server/axios";
import {ApiResponse} from "@/types/ApiResponse";
import {EditUserPayload} from "@/types/EditUserPayload";
import {EditUserResponse} from "@/types/EditUserResponse";

export async function PATCH(
	req: NextRequest,
	{params}: {params: {id: string}},
) {
	try {
		const requestData: EditUserPayload = await req.json();

		const apiResponse: AxiosResponse<EditUserResponse> =
			await axiosInstance.patch(
				`/api/v1/users-dashboard/${params.id}`,
				requestData,
			);

		const res = NextResponse.json(apiResponse.data, {
			status: apiResponse.status,
		});

		console.log(res);
		return res;
	} catch (error) {
		console.log(error);
		if (isAxiosError(error)) {
			return NextResponse.json(error, {
				status: error.response?.status,
			});
		}
	}
}

export async function DELETE(req: NextRequest) {
	const getID = req.url.split("/");

	let url = process.env.API_BFF_URL + "/api/v1/users-dashboard";

	if (getID.length > 0) {
		url = url + "/" + getID[getID.length - 1];
	}

	try {
		const apiResponse: AxiosResponse<ApiResponse> =
			await axiosInstance.delete(url);

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
