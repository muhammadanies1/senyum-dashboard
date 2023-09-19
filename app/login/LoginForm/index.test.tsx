import React from "react";

import {fireEvent, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "./";

describe("LoginForm Component", () => {
	it("renders the LoginForm component", () => {
		const {container} = render(<LoginForm />);
		const loginForm = container.getElementsByClassName("login-form");
		expect(loginForm[0]).toBeInTheDocument();
	});

	it("validates the form fields correctly", async () => {
		const {
			findByText,
			getByLabelText,
			getByTestId,
			queryByTestId,
			queryByText,
		} = render(<LoginForm />);
		const usernameInput = getByLabelText("Username");
		const passwordInput = getByTestId("password");
		const submitButton = getByTestId("submit-btn");

		// Fill in the form fields with valid values
		userEvent.type(usernameInput, "testuser");
		userEvent.type(passwordInput, "password123");

		// Submit the form again
		fireEvent.click(submitButton);

		// Check that error messages are not present
		expect(queryByText("Username harus diisi.")).toBeNull();
		expect(queryByText("Password harus diisi.")).toBeNull();
		expect(queryByTestId("submit-btn")).toHaveAttribute("disabled", "");
	});
});
