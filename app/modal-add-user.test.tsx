import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import ModalAddUser from "./modal-add-user";

window.alert = jest.fn();

describe("ModalAddUser component", () => {
	it("renders the 'Add user' button", () => {
		render(<ModalAddUser />);
		const addButton = screen.getByTestId("show-add-user-modal-btn");
		expect(addButton).toBeInTheDocument();
	});

	it("opens the modal when the 'Add user' button is clicked", () => {
		render(<ModalAddUser />);
		const addButton = screen.getByTestId("show-add-user-modal-btn");
		const submitButton = screen.getByTestId("submit-add-user-modal-btn");
		userEvent.click(addButton);

		const modal = screen.getByTestId("modal-form");
		expect(modal).toBeInTheDocument();
		expect(submitButton).toBeDisabled();
	});

	it("closes the modal when the close button is clicked", () => {
		const {getByTestId, queryByTestId} = render(<ModalAddUser />);
		const addButton = getByTestId("show-add-user-modal-btn");
		userEvent.click(addButton);

		const closeButton =
			getByTestId("modal-header").querySelector(".modal-close-btn");
		if (!closeButton) {
			throw new Error("Element does not exist.");
		}
		userEvent.click(closeButton);

		const modal = queryByTestId("modal-form");
		expect(modal).not.toHaveClass("opacity-100");
	});

	it("displays validation errors when submitting empty inputs", async () => {
		const {findByTestId, getByTestId} = render(<ModalAddUser />);
		const addButton = getByTestId("show-add-user-modal-btn");
		const submitButton = getByTestId("submit-add-user-modal-btn");
		userEvent.click(addButton);

		const usernameInput = getByTestId("username");
		const nameInput = getByTestId("name");
		const emailInput = getByTestId("email");
		const passwordInput = getByTestId("password");

		userEvent.click(usernameInput);
		userEvent.click(nameInput);
		userEvent.click(emailInput);
		userEvent.click(passwordInput);
		userEvent.click(submitButton);
		userEvent.keyboard("{Tab}");

		expect(await findByTestId("username-error-message")).toBeInTheDocument();
		expect(await findByTestId("name-error-message")).toBeInTheDocument();
		expect(await findByTestId("email-error-message")).toBeInTheDocument();
		expect(await findByTestId("password-error-message")).toBeInTheDocument();
	});

	it("displays validation errors when submitting an invalid email or password", async () => {
		const {findByTestId, getByTestId} = render(<ModalAddUser />);
		const addButton = getByTestId("show-add-user-modal-btn");
		userEvent.click(addButton);

		const emailInput = getByTestId("email");
		const passwordInput = getByTestId("password");

		userEvent.type(emailInput, "invalidemail");
		userEvent.type(passwordInput, "invalidpassword");
		userEvent.keyboard("{Tab}");

		expect(await findByTestId("email-error-message")).toBeInTheDocument();
		expect(await findByTestId("password-error-message")).toBeInTheDocument();
	});

	it("submits the form with valid data", async () => {
		const {getByTestId, queryByTestId} = render(<ModalAddUser />);
		const addButton = getByTestId("show-add-user-modal-btn");
		const modal = queryByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(addButton);

		const usernameInput = getByTestId("username");
		userEvent.type(usernameInput, "testuser");

		const nameInput = getByTestId("name");
		userEvent.type(nameInput, "Test User");

		const emailInput = getByTestId("email");
		userEvent.type(emailInput, "testuser@bri.co.id");

		const adminRadio = getByTestId("radio-admin");
		userEvent.click(adminRadio);

		const passwordInput = getByTestId("password");
		userEvent.type(passwordInput, "Password123!");
		userEvent.keyboard("{Tab}");

		await waitFor(() => {
			expect(getByTestId("password-check-circle")).toBeVisible();
		});

		const submitButton = getByTestId("submit-add-user-modal-btn");
		userEvent.click(submitButton);

		userEvent.clear(passwordInput);

		await waitFor(() => {
			expect(submitButton).toBeDisabled();
		});
	});
});
