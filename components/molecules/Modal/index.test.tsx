import React from "react";

import {fireEvent, render, waitFor} from "@testing-library/react";

import Modal from "./";

describe("Modal component", () => {
	it("should render the modal when isShow is true", () => {
		const {getByTestId} = render(
			<Modal isShow={true} data-testid="modal">
				<div>Modal Content</div>
			</Modal>,
		);

		const modal = getByTestId("modal");
		expect(modal).toHaveClass("block");
	});

	it("should not render the modal when isShow is false", () => {
		const {getByTestId} = render(
			<Modal isShow={false} data-testid="modal">
				<div data-testid="modal-content">Modal Content</div>
			</Modal>,
		);

		const modal = getByTestId("modal");
		const modalContent = getByTestId("modal-content");

		expect(modal).not.toHaveClass("block");
		expect(modalContent).toBeInTheDocument();
	});

	it("should call onClickBackground when modal background is clicked", async () => {
		const onClickBackground = jest.fn();
		const {getByTestId} = render(
			<Modal
				isShow={true}
				data-testid="modal"
				onClickBackground={onClickBackground}
			>
				<div data-testid="modal-content">Modal Content</div>
			</Modal>,
		);

		await waitFor(() => {
			const modal = getByTestId("modal");
			const modalBackground = modal.parentNode;

			if (!modalBackground) {
				throw new Error("modal background not found");
			}

			fireEvent.click(modalBackground);
			expect(onClickBackground).toHaveBeenCalledTimes(1);
		});
	});
});
