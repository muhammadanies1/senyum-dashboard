import {AxiosResponse, isAxiosError} from "axios";
import {NextRequest, NextResponse} from "next/server";

import axiosInstance from "@/config/server/axios";
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
