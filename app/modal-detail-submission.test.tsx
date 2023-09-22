import React from "react";

import {render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ModalDetailSubmission from "./modal-detail-submission";

describe("ModalDetailSubmission", () => {
	it("render the 'Detail' button to show the modal", () => {
		const {getByTestId} = render(<ModalDetailSubmission />);
		const showModalDetailButton = getByTestId("show-modal-detail-btn");
		expect(showModalDetailButton).toBeInTheDocument();
	});

	it("not render the modal detail and modal download by default", () => {
		const {getByTestId} = render(<ModalDetailSubmission />);
		const modalDetail = getByTestId("modal-detail-form");
		const modalDownload = getByTestId("modal-download-form");
		expect(modalDetail).not.toHaveClass("opacity-100");
		expect(modalDownload).not.toHaveClass("opacity-100");
	});

	it("render the modal when the 'Detail' button is clicked", async () => {
		const {getByTestId} = render(<ModalDetailSubmission />);
		const showModalDetailButton = getByTestId("show-modal-detail-btn");
		userEvent.click(showModalDetailButton);

		const modalDetail = getByTestId("modal-detail-form");
		await waitFor(() => {
			expect(modalDetail).toHaveClass("opacity-100");
		});
	});

	it("render the pictures and text inside the modal", async () => {
		const {getByTestId} = render(<ModalDetailSubmission />);
		const showModalDetailButton = getByTestId("show-modal-detail-btn");
		const modalDetail = getByTestId("modal-detail-form");

		expect(modalDetail).not.toHaveClass("opacity-100");
		userEvent.click(showModalDetailButton);

		await waitFor(() => {
			expect(modalDetail).toHaveClass("opacity-100");
		});

		const photoKTP = getByTestId("image-ktp");
		const photoSelfie = getByTestId("image-selfie");
		const valueNIK = getByTestId("value-nik");
		const valueFullName = getByTestId("value-fullname");
		const valuePhoneNumber = getByTestId("value-phone-number");
		const valueGender = getByTestId("value-gender");
		const valueBirthdate = getByTestId("value-birthdate");
		const valueReligion = getByTestId("value-religion");
		const valueMaritalStatus = getByTestId("value-marital-status");
		const valueMotherName = getByTestId("value-mother-name");
		const valueEducation = getByTestId("value-education");
		const valueOccupation = getByTestId("value-occupation");
		const valueBusinessField = getByTestId("value-business-field");
		const valueIDAddress = getByTestId("value-id-address");
		const valueHomeAddress = getByTestId("value-home-address");

		expect(photoKTP).toBeInTheDocument();
		expect(photoSelfie).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("NIK");
		expect(valueNIK).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("Nama Lengkap");
		expect(valueFullName).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("No Telepon");
		expect(valuePhoneNumber).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("Jenis Kelamin");
		expect(valueGender).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("Tempat, Tgl Lahir");
		expect(valueBirthdate).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("Agama");
		expect(valueReligion).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("Status Perkawinan");
		expect(valueMaritalStatus).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("Nama Ibu Kandung");
		expect(valueMotherName).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("Pendidikan Terakhir");
		expect(valueEducation).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("Pekerjaan");
		expect(valueOccupation).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("Bidang Usaha");
		expect(valueBusinessField).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("Alamat KTP");
		expect(valueIDAddress).toBeInTheDocument();

		expect(modalDetail).toHaveTextContent("Alamat Tinggal");
		expect(valueHomeAddress).toBeInTheDocument();
	});

	it("close the modal detail when the close button in modal detail is clicked", async () => {
		const {queryByTestId, getByTestId} = render(<ModalDetailSubmission />);
		const showModalDetailButton = getByTestId("show-modal-detail-btn");
		const modalDetail = queryByTestId("modal-detail-form");

		expect(modalDetail).not.toHaveClass("opacity-100");

		userEvent.click(showModalDetailButton);
		await waitFor(() => {
			expect(modalDetail).toHaveClass("opacity-100");
		});

		const closeModalDetailButton = getByTestId(
			"modal-detail-header",
		).querySelector(".modal-close-btn");
		if (!closeModalDetailButton) {
			throw new Error("Element does not exist.");
		}
		userEvent.click(closeModalDetailButton);

		await waitFor(() => {
			expect(modalDetail).not.toHaveClass("opacity-100");
		});
	});

	it("close the modal detail when the background modal detail is clicked", async () => {
		const {getByTestId} = render(<ModalDetailSubmission />);
		const showModalDetailButton = getByTestId("show-modal-detail-btn");
		const modalDetail = getByTestId("modal-detail-form");

		expect(modalDetail).not.toHaveClass("opacity-100");

		userEvent.click(showModalDetailButton);
		await waitFor(() => {
			expect(modalDetail).toHaveClass("opacity-100");
		});

		await waitFor(() => {
			const modalDetailBackground = modalDetail.parentNode as Element;
			if (!modalDetailBackground) {
				throw new Error("Element does not exist.");
			}
			userEvent.click(modalDetailBackground);
		});

		await waitFor(() => {
			expect(modalDetail).not.toHaveClass("opacity-100");
		});
	});

	it('trigger the download modal when the "Download Submission" button is clicked', async () => {
		const {getByTestId} = render(<ModalDetailSubmission />);
		const showModalDetailButton = getByTestId("show-modal-detail-btn");
		userEvent.click(showModalDetailButton);

		const showModalDownloadButton = getByTestId("show-modal-download-btn");
		userEvent.click(showModalDownloadButton);

		const modalDownload = getByTestId("modal-download-form");
		await waitFor(() => {
			expect(modalDownload).toHaveClass("opacity-100");
		});
	});

	// Add more specific tests for content within the modal body as needed.
});
