import React from "react";

import {render} from "@testing-library/react";

import NavbarMenu from "./";

describe("NavbarMenu component", () => {
	it("renders without errors", () => {
		render(<NavbarMenu />);
	});

	it("renders notification link", () => {
		const {getByTitle} = render(<NavbarMenu />);
		const notificationLink = getByTitle("Notifikasi");
		expect(notificationLink).toBeInTheDocument();
	});

	it("renders profile link", () => {
		const {getByTitle} = render(<NavbarMenu />);
		const profileLink = getByTitle("Profile");
		expect(profileLink).toBeInTheDocument();
	});

	it("renders the username", () => {
		const {getByText} = render(<NavbarMenu userName="John Doe" />);
		const usernameElement = getByText("John Doe");
		expect(usernameElement).toBeInTheDocument();
	});

	it("renders the avatar", () => {
		const {getByAltText, getByTitle} = render(
			<NavbarMenu userName="John Doe" />,
		);
		const avatarElement = getByTitle("John Doe Avatar");
		expect(avatarElement).toBeInTheDocument();
	});

	it("collapses when isExpand prop is false", () => {
		const {container} = render(<NavbarMenu isExpand={false} />);
		const navbarMenu = container.querySelector(".navbar-menu");
		expect(navbarMenu).toHaveClass("collapsed");
	});

	it("does not collapse when isExpand prop is true", () => {
		const {container} = render(<NavbarMenu isExpand={true} />);
		const navbarMenu = container.querySelector(".navbar-menu");
		expect(navbarMenu).not.toHaveClass("collapsed");
	});
});
