import React from "react";

import {fireEvent, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ModalAddUser from "./modal-add-user";

describe("ModalAddUser", () => {
	it("renders the 'Tambah User' button", () => {
		const {getByTestId} = render(<ModalAddUser />);
		const showModalButton = getByTestId("show-modal-btn");

		expect(showModalButton).toBeInTheDocument();
	});

	it("opens the modal when the 'Tambah User' button is clicked", async () => {
		const {getByTestId} = render(<ModalAddUser />);
		const modal = getByTestId("modal-form");
		const showModalButton = getByTestId("show-modal-btn");
		const submitButton = getByTestId("submit-modal-btn");
		const usernameInput = getByTestId("username");
		const passwordInput = getByTestId("password");
		const emailInput = getByTestId("email");
		const nameInput = getByTestId("name");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		expect(usernameInput).toHaveValue("");
		expect(nameInput).toHaveValue("");
		expect(emailInput).toHaveValue("");
		expect(passwordInput).toHaveValue("");
		expect(submitButton).toBeDisabled();
	});

	it("closes the modal when the close button is clicked", async () => {
		const {getByTestId} = render(<ModalAddUser />);
		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const closeModalButton =
			getByTestId("modal-header").querySelector(".modal-close-btn");
		if (!closeModalButton) {
			throw new Error("Element does not exist.");
		}
		userEvent.click(closeModalButton);

		await waitFor(() => {
			expect(modal).not.toHaveClass("opacity-100");
		});
	});

	it("closes the modal when the background is clicked", async () => {
		const {getByTestId} = render(<ModalAddUser />);
		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		await waitFor(() => {
			const modalBackground = modal.parentNode;
			if (!modalBackground) {
				throw new Error("Element does not exist.");
			}
			fireEvent.click(modalBackground);
		});

		await waitFor(() => {
			expect(modal).not.toHaveClass("opacity-100");
		});
	});

	it("displays validation errors when submitting empty inputs", async () => {
		const {findByTestId, getByTestId} = render(<ModalAddUser />);
		const showModalButton = getByTestId("show-modal-btn");
		const submitButton = getByTestId("submit-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

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
		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const emailInput = getByTestId("email");
		const passwordInput = getByTestId("password");

		userEvent.type(emailInput, "invalidemail");
		userEvent.type(passwordInput, "invalidpassword");
		userEvent.keyboard("{Tab}");

		expect(await findByTestId("email-error-message")).toBeInTheDocument();
		expect(await findByTestId("password-error-message")).toBeInTheDocument();
	});

	it("submits the form with valid data", async () => {
		const {getByTestId} = render(<ModalAddUser />);
		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const usernameInput = getByTestId("username");
		const nameInput = getByTestId("name");
		const emailInput = getByTestId("email");
		const adminRadio = getByTestId("radio-admin");
		const passwordInput = getByTestId("password");

		userEvent.type(usernameInput, "testuser");
		userEvent.type(nameInput, "Test User");
		userEvent.type(emailInput, "testuser@bri.co.id");
		userEvent.click(adminRadio);
		await waitFor(() => {
			expect(adminRadio).toBeChecked();
		});
		userEvent.type(passwordInput, "Password123!");

		const showPasswordButton = getByTestId("show-password-btn");
		userEvent.click(showPasswordButton);
		await waitFor(() => {
			expect(passwordInput).toHaveAttribute("type", "password");
		});

		userEvent.click(showPasswordButton);
		await waitFor(() => {
			expect(passwordInput).toHaveAttribute("type", "text");
		});

		const submitButton = getByTestId("submit-modal-btn");
		await waitFor(() => {
			expect(submitButton).toHaveAttribute("disabled", "");
		});
		userEvent.click(submitButton);

		userEvent.clear(passwordInput);

		await waitFor(() => {
			expect(submitButton).toBeDisabled();
		});
	});
});
