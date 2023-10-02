import {rest} from "msw";

export const handlers = [
	rest.post("/api/user", (req, res, ctx) => {
		return res(
			ctx.status(201),
			ctx.json({
				responseCode: "0200",
				responseDescription: "SUCCESS",
				data: {
					counter: 0,
					createdAt: "2023-09-29T07:58:14Z",
					deviceId: "QpRmsC8XItOZYqQQH26eD",
					email: "johndoe3@work.bri.co.id",
					id: 25,
					name: "John Doe3",
					phoneNumber: "081234567890",
					updatedAt: "2023-09-29T07:58:14Z",
					userTypeId: "VIEWER",
					username: "90123423",
				},
			}),
		);
	}),
];
