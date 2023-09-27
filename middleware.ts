import {NextResponse} from "next/server";

import type {NextRequest} from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("TOKEN");

	if (!token?.value && request.nextUrl.pathname !== "/login") {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (request.nextUrl.pathname === "/login" && token?.value) {
		return NextResponse.redirect(new URL("/application", request.url));
	}

	if (request.nextUrl.pathname === "/") {
		console.log("masuk");
		return NextResponse.redirect(new URL("/application", request.url));
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
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
