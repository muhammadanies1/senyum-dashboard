import React from "react";

import {fireEvent, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ModalDeleteUser from "./modal-delete-user";

describe("ModalDeleteUser", () => {
	it("renders the 'Delete user' button", () => {
		const {getByTestId} = render(<ModalDeleteUser idData={1} />);
		const showModalButton = getByTestId("show-modal-btn");

		expect(showModalButton).toBeInTheDocument();
	});

	it("opens the modal when the 'Delete user' button is clicked", async () => {
		const {getByTestId} = render(<ModalDeleteUser idData={1} />);
		const showModalButton = getByTestId("show-modal-btn");
		const submitButton = getByTestId("submit-modal-btn");
		const cancelButton = getByTestId("cancel-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		expect(submitButton).toBeEnabled();
		expect(cancelButton).toBeEnabled();
	});

	it("closes the modal when the close button is clicked", async () => {
		const {getByTestId} = render(<ModalDeleteUser idData={1} />);
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
		const {getByTestId} = render(<ModalDeleteUser idData={1} />);
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

	it("cancel the form", async () => {
		const {getByTestId} = render(<ModalDeleteUser idData={1} />);
		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const cancelButton = getByTestId("cancel-modal-btn");
		userEvent.click(cancelButton);

		await waitFor(() => {
			expect(modal).not.toHaveClass("opacity-100");
		});
	});

	it("submit the form", async () => {
		const {getByTestId} = render(<ModalDeleteUser idData={1} />);
		const showModalButton = getByTestId("show-modal-btn");
		const modal = getByTestId("modal-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const submitButton = getByTestId("submit-modal-btn");
		userEvent.click(submitButton);
	});
});
