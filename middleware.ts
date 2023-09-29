import {NextResponse} from "next/server";

import type {NextRequest} from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("TOKEN");

	if (request.nextUrl.pathname.match("/api")) {
		console.log(request.nextUrl);
	} else {
		if (!token?.value && request.nextUrl.pathname !== "/login") {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		if (request.nextUrl.pathname === "/login" && token?.value) {
			return NextResponse.redirect(new URL("/application", request.url));
		}

		if (request.nextUrl.pathname === "/") {
			return NextResponse.redirect(new URL("/application", request.url));
		}
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!_next/static|_next/image|favicon.ico).*)",
	],
};
