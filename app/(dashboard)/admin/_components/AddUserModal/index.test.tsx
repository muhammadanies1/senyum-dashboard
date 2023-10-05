import React from "react";

import axiosInstance from "@/config/client/axios";
import {server} from "@/mocks/server";
import {fireEvent, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddUser from "./";

const onSuccessCallback = jest.fn();

jest.mock("nanoid", () => {
	return {
		nanoid: () => 123456,
	};
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("AddUser", () => {
	it("renders the 'Tambah User' button", () => {
		const {getByTestId} = render(<AddUser onSuccess={onSuccessCallback} />);
		const showModalButton = getByTestId("show-modal-btn");

		expect(showModalButton).toBeInTheDocument();
	});

	it("opens the modal when the 'Tambah User' button is clicked", async () => {
		const {getByTestId} = render(<AddUser onSuccess={onSuccessCallback} />);
		const modal = getByTestId("modal-form");
		const showModalButton = getByTestId("show-modal-btn");
		const submitButton = getByTestId("add-user-modal-submit-btn");
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
		const {getByTestId} = render(<AddUser onSuccess={onSuccessCallback} />);
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
		const {getByTestId} = render(<AddUser onSuccess={onSuccessCallback} />);
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
		const {findByTestId, getByTestId} = render(
			<AddUser onSuccess={onSuccessCallback} />,
		);
		const showModalButton = getByTestId("show-modal-btn");
		const submitButton = getByTestId("add-user-modal-submit-btn");
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
		const passwordConfirmInput = getByTestId("password-confirm");

		userEvent.click(usernameInput);
		userEvent.click(nameInput);
		userEvent.click(emailInput);
		userEvent.click(passwordInput);
		userEvent.click(passwordConfirmInput);
		userEvent.click(submitButton);
		userEvent.keyboard("{Tab}");

		expect(await findByTestId("username-error-message")).toBeInTheDocument();
		expect(await findByTestId("name-error-message")).toBeInTheDocument();
		expect(await findByTestId("email-error-message")).toBeInTheDocument();
		expect(await findByTestId("password-error-message")).toBeInTheDocument();
		expect(
			await findByTestId("password-confirm-error-message"),
		).toBeInTheDocument();
	});

	it("displays validation errors when submitting an invalid email or password", async () => {
		const {findByTestId, getByTestId} = render(
			<AddUser onSuccess={onSuccessCallback} />,
		);
		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const emailInput = getByTestId("email");
		const passwordInput = getByTestId("password");
		const passwordConfirmInput = getByTestId("password-confirm");

		userEvent.type(emailInput, "invalidemail");
		userEvent.type(passwordInput, "invalidpassword");
		userEvent.type(passwordConfirmInput, "notinvalidpassword");
		userEvent.keyboard("{Tab}");

		expect(await findByTestId("email-error-message")).toBeInTheDocument();
		expect(await findByTestId("password-error-message")).toBeInTheDocument();
		expect(
			await findByTestId("password-confirm-error-message"),
		).toBeInTheDocument();
	});

	it("submits the form with valid data", async () => {
		const {getByTestId} = render(<AddUser onSuccess={onSuccessCallback} />);
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
		const passwordConfirmInput = getByTestId("password-confirm");

		userEvent.type(usernameInput, "testuser");
		userEvent.type(nameInput, "Test User");
		userEvent.type(emailInput, "testuser@bri.co.id");
		userEvent.click(adminRadio);
		await waitFor(() => {
			expect(adminRadio).toBeChecked();
		});

		userEvent.type(passwordInput, "Password123!");

		const showPasswordButton = getByTestId("toggle-password-btn");
		userEvent.click(showPasswordButton);
		await waitFor(() => {
			expect(passwordInput).toHaveAttribute("type", "password");
		});

		userEvent.click(showPasswordButton);
		await waitFor(() => {
			expect(passwordInput).toHaveAttribute("type", "text");
		});

		userEvent.type(passwordConfirmInput, "Password123!");

		const showPasswordConfirmButton = getByTestId(
			"toggle-password-confirm-btn",
		);
		userEvent.click(showPasswordConfirmButton);
		await waitFor(() => {
			expect(passwordConfirmInput).toHaveAttribute("type", "password");
		});

		userEvent.click(showPasswordConfirmButton);
		await waitFor(() => {
			expect(passwordConfirmInput).toHaveAttribute("type", "text");
		});

		const submitButton = getByTestId("add-user-modal-submit-btn");
		await waitFor(() => {
			expect(submitButton).toHaveAttribute("disabled", "");
		});
		userEvent.click(submitButton);

		userEvent.clear(passwordInput);

		await waitFor(() => {
			expect(submitButton).toBeDisabled();
		});
	});

	it("should call onSuccessCallback when success to submit new user", async () => {
		const {getByTestId, debug} = render(
			<AddUser onSuccess={onSuccessCallback} />,
		);

		// Open the modal
		const showModalBtn = getByTestId("show-modal-btn");
		fireEvent.click(showModalBtn);

		await waitFor(() => {
			expect(getByTestId("modal-form").parentElement).toHaveClass(
				"flex justify-center items-center",
			);
		});

		// Fill in the form fields
		await userEvent.type(getByTestId("username"), "901506012");
		await userEvent.type(getByTestId("name"), "John Doe");
		await userEvent.type(getByTestId("email"), "john.doe@work.bri.co.id");
		await userEvent.type(getByTestId("phone-number"), "1234567890");
		await userEvent.click(getByTestId("radio-admin"));
		await userEvent.type(getByTestId("password"), "Password123!");
		await userEvent.type(getByTestId("password-confirm"), "Password123!");

		await waitFor(() => {
			expect(getByTestId("add-user-modal-submit-btn")).not.toBeDisabled();
		});

		// Submit the form
		const submitBtn = getByTestId("add-user-modal-submit-btn");
		fireEvent.click(submitBtn);

		// Wait for the API call to finish
		await waitFor(() => {
			expect(onSuccessCallback).toHaveBeenCalled();
		});
	});
});
