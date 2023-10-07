import {AxiosResponse, isAxiosError} from "axios";
import {NextRequest, NextResponse} from "next/server";

import axiosInstance from "@/config/server/axios";
import {GetProfileResponse} from "@/types/GetProfileResponse";

export async function GET(req: NextRequest) {
	let url = process.env.API_BFF_URL + "/api/v1/users-dashboard/get/profile";

	try {
		const apiResponse: AxiosResponse<GetProfileResponse> =
			await axiosInstance.get(url);

		const res = NextResponse.json(apiResponse.data, {
			status: apiResponse.status,
		});

		res.cookies.set({
			name: "USER_TYPE",
			value: apiResponse.data.data.userTypeId,
		});

		return res;
	} catch (error) {
		if (isAxiosError(error)) {
			return NextResponse.json(error.response?.data, {
				status: error?.response?.status,
			});
		}
	}
}
