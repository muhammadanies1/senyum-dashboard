import React from "react";

import {fireEvent, render} from "@testing-library/react";

import Navbar from "./";

describe("Navbar component", () => {
	it("renders without errors", () => {
		render(<Navbar />);
	});

	it("renders the NavbarLogo component", () => {
		const {getByTestId} = render(<Navbar />);
		const navbarLogo = getByTestId("navbar-logo");
		expect(navbarLogo).toBeInTheDocument();
	});

	it("renders the NavbarMenu component", () => {
		const {getByTestId} = render(<Navbar isLoggedIn />);
		const navbarMenu = getByTestId("navbar-menu");
		expect(navbarMenu).toBeInTheDocument();
	});

	it("initially renders the menu as collapsed", () => {
		const {getByTestId} = render(<Navbar isLoggedIn />);
		const navbarMenu = getByTestId("navbar-menu");
		expect(navbarMenu).toHaveClass("collapsed");
	});

	it("expands the menu when the button is clicked", () => {
		const {getByTestId} = render(<Navbar isLoggedIn />);
		const menuButton = getByTestId("menu-toggler");
		const navbarMenu = getByTestId("navbar-menu");

		// Check if the menu is initially collapsed
		expect(navbarMenu).toHaveClass("collapsed");

		// Click the menu button to expand the menu
		fireEvent.click(menuButton);

		// Check if the menu is now expanded
		expect(navbarMenu).not.toHaveClass("collapsed");
	});

	it("collapses the menu when the button is clicked twice", () => {
		const {getByTestId} = render(<Navbar isLoggedIn />);
		const menuButton = getByTestId("menu-toggler");
		const navbarMenu = getByTestId("navbar-menu");

		// Click the menu button twice to toggle the menu
		fireEvent.click(menuButton);
		fireEvent.click(menuButton);

		// Check if the menu is collapsed again
		expect(navbarMenu).toHaveClass("collapsed");
	});
});
