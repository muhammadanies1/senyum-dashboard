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
		const apiResponse = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: decodeURIComponent(token?.value || ""),
			},
		});

		if (!apiResponse.ok) {
			const errorResponse = JSON.parse(await apiResponse.text());
			return NextResponse.json(errorResponse, {status: apiResponse.status});
		}

		const data: UserCollectionResponse = await apiResponse.json();

		console.log(
			JSON.stringify({
				status: apiResponse.ok,
				url: apiResponse.url,
				data,
			}),
		);

		const res = NextResponse.json(data, {
			status: apiResponse.status,
		});

		return res;
	} catch (error) {
		throw error;
	}
}
