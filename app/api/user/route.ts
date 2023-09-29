import {AxiosResponse, isAxiosError} from "axios";
import axiosInstance from "config/axios";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

import {ApiResponse} from "@/types/ApiResponse";
import {PaginationResponse} from "@/types/PaginationResponse";

export type UserCollectionParams = {
	orderBy?: string;
	draw?: number;
	page?: number;
	limit?: number;
	userId?: string;
	search?: string;
	sortBy?: "asc" | "desc";
};

export type User = {
	Password: string;
	counter: number;
	createdAt: string;
	deviceId: string;
	email: string;
	id: number;
	name: string;
	phoneNumber: string;
	updatedAt: string;
	userTypeId: string;
	username: string;
};

export type UserCollectionResponse = ApiResponse<PaginationResponse<User[]>>;

export async function GET(req: NextRequest) {
	const cookiesStore = cookies();
	const token = cookiesStore.get("TOKEN");
	const searchParams = req.url.split("?");

	let url = process.env.API_BFF_URL + "/api/v1/users-dashboard/get";

	if (searchParams.length === 2) {
		url = url + "?" + searchParams[1];
	}

	try {
		const apiResponse: AxiosResponse<UserCollectionResponse> =
			await axiosInstance.get(url, {
				headers: {
					Authorization: token?.value,
				},
			});

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
