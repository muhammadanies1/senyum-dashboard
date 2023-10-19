import React from "react";

import {render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DownloadApplication from "./";

window.alert = jest.fn();

describe("DownloadApplication", () => {
	it("renders the 'Download Data Pengajuan' button", () => {
		const {getByTestId} = render(<DownloadApplication />);
		const showModalButton = getByTestId("show-modal-download-btn");

		expect(showModalButton).toBeInTheDocument();
	});

	it("opens the modal when the 'Download Data Pengajuan' button is clicked and submit button is disabled initially", async () => {
		const {getByTestId} = render(<DownloadApplication />);
		const submitModalButton = getByTestId("submit-modal-download-btn");
		const showModalButton = getByTestId("show-modal-download-btn");
		const modal = getByTestId("modal-download-form");
		const xlsRadio = getByTestId("radio-xls");
		const csvRadio = getByTestId("radio-csv");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		expect(xlsRadio).not.toBeChecked();
		expect(csvRadio).not.toBeChecked();
		expect(submitModalButton).toBeDisabled();
	});

	it("closes the modal when the close button is clicked", async () => {
		const {getByTestId, queryByTestId} = render(<DownloadApplication />);
		const showModalButton = getByTestId("show-modal-download-btn");
		const modal = queryByTestId("modal-download-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		const closeModalButton = getByTestId("modal-download-header").querySelector(
			".modal-close-btn",
		);
		if (!closeModalButton) {
			throw new Error("Element does not exist.");
		}
		userEvent.click(closeModalButton);

		await waitFor(() => {
			expect(modal).not.toHaveClass("opacity-100");
		});
	});

	it("closes the modal when the background is clicked", async () => {
		const {getByTestId} = render(<DownloadApplication />);
		const showModalButton = getByTestId("show-modal-download-btn");
		const modal = getByTestId("modal-download-form");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		await waitFor(() => {
			const modalBackground = modal.parentNode as Element;
			if (!modalBackground) {
				throw new Error("Element does not exist.");
			}
			userEvent.click(modalBackground);
		});

		await waitFor(() => {
			expect(modal).not.toHaveClass("opacity-100");
		});
	});

	it("submits the form with valid data", async () => {
		const {getByTestId, queryByTestId} = render(<DownloadApplication />);
		const submitModalButton = getByTestId("submit-modal-download-btn");
		const showModalButton = getByTestId("show-modal-download-btn");
		const modal = queryByTestId("modal-download-form");
		const xlsRadio = getByTestId("radio-xls");
		const csvRadio = getByTestId("radio-csv");

		expect(modal).not.toHaveClass("opacity-100");

		userEvent.click(showModalButton);
		await waitFor(() => {
			expect(modal).toHaveClass("opacity-100");
		});

		expect(xlsRadio).not.toBeChecked();
		expect(csvRadio).not.toBeChecked();

		userEvent.click(xlsRadio);
		await waitFor(() => {
			expect(csvRadio).not.toBeChecked();
			expect(xlsRadio).toBeChecked();
		});

		userEvent.click(csvRadio);
		await waitFor(() => {
			expect(xlsRadio).not.toBeChecked();
			expect(csvRadio).toBeChecked();
		});

		userEvent.click(xlsRadio);
		await waitFor(() => {
			expect(csvRadio).not.toBeChecked();
			expect(xlsRadio).toBeChecked();
		});

		expect(submitModalButton).toBeEnabled();
		userEvent.click(submitModalButton);

		await waitFor(() => {
			expect(window.alert).toHaveBeenCalledWith(`data: {"format":"xls"}`);
			expect(window.alert).toHaveBeenCalledTimes(1);
		});
	});
});