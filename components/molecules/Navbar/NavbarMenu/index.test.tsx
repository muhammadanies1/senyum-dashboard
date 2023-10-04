import React from "react";

import {render} from "@testing-library/react";

import {NavbarContext} from "../";
import NavbarMenu from "./";

jest.mock("next/navigation", () => ({
	useRouter: () => ({
		...jest.requireActual("next/navigation").useRouter,
	}),
}));

describe("NavbarMenu component", () => {
	it("renders without errors", () => {
		render(
			<NavbarContext.Provider
				value={{
					isExpand: false,
					userName: "John Doe",
				}}
			>
				<NavbarMenu />
			</NavbarContext.Provider>,
		);
	});

	it("renders notification link", () => {
		const {getByTitle} = render(<NavbarMenu />);
		const notificationLink = getByTitle("Notifikasi");
		expect(notificationLink).toBeInTheDocument();
	});

	it("renders profile link", () => {
		const {getByTestId} = render(<NavbarMenu />);
		const profileLink = getByTestId("profile-dropdown");
		expect(profileLink).toBeInTheDocument();
	});

	it("renders the username", () => {
		const {getByText} = render(
			<NavbarContext.Provider
				value={{
					isExpand: false,
					userName: "John Doe",
				}}
			>
				<NavbarMenu />
			</NavbarContext.Provider>,
		);
		const usernameElement = getByText("John Doe");
		expect(usernameElement).toBeInTheDocument();
	});

	it("renders the avatar", () => {
		const {getByTitle} = render(
			<NavbarContext.Provider
				value={{
					isExpand: false,
					userName: "John Doe",
				}}
			>
				<NavbarMenu />
			</NavbarContext.Provider>,
		);
		const avatarElement = getByTitle("John Doe Avatar");
		expect(avatarElement).toBeInTheDocument();
	});

	it("collapses when isExpand prop is false", () => {
		const {container} = render(
			<NavbarContext.Provider
				value={{
					isExpand: false,
					userName: "John Doe",
				}}
			>
				<NavbarMenu />
			</NavbarContext.Provider>,
		);
		const navbarMenu = container.querySelector(".navbar-menu");
		expect(navbarMenu).toHaveClass("collapsed");
	});

	it("does not collapse when isExpand prop is true", () => {
		const {container} = render(
			<NavbarContext.Provider
				value={{
					isExpand: true,
					userName: "John Doe",
				}}
			>
				<NavbarMenu />
			</NavbarContext.Provider>,
		);
		const navbarMenu = container.querySelector(".navbar-menu");
		expect(navbarMenu).not.toHaveClass("collapsed");
	});

	it("renders with custom className", () => {
		const {container} = render(
			<NavbarContext.Provider
				value={{
					isExpand: true,
					userName: "John Doe",
				}}
			>
				<NavbarMenu className="custom-class" />
			</NavbarContext.Provider>,
		);

		const navbarMenu = container.querySelector(".navbar-menu");
		expect(navbarMenu).toHaveClass("custom-class");
	});
});
