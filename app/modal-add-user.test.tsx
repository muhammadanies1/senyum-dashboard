import React from "react";

import {act, fireEvent, render} from "@testing-library/react";

import ModalAddUser from "./modal-add-user";

describe("ModalAddUser", () => {
	it("renders without errors", () => {
		const {getByTestId} = render(<ModalAddUser />);
		expect(getByTestId("modal-form")).toBeInTheDocument();
	});

	it("updates selectedUserType when a radio button is clicked", () => {
		const {getByTestId} = render(<ModalAddUser />);
		const adminRadio = getByTestId("radio-admin");
		const viewerRadio = getByTestId("radio-viewer");

		fireEvent.click(adminRadio);
		expect(adminRadio).toBeChecked();
		expect(viewerRadio).not.toBeChecked();

		fireEvent.click(viewerRadio);
		expect(viewerRadio).toBeChecked();
		expect(adminRadio).not.toBeChecked();
	});

	it("should validate and submit the form when all fields are filled correctly", () => {
		const {getByTestId} = render(<ModalAddUser />);

		fireEvent.change(getByTestId("username"), {
			target: {value: "johndoe"},
		});
		expect(getByTestId("username")).toHaveAttribute("value", "johndoe");

		fireEvent.change(getByTestId("name"), {
			target: {value: "John Doe"},
		});
		expect(getByTestId("name")).toHaveAttribute("value", "John Doe");

		fireEvent.change(getByTestId("email"), {
			target: {value: "john.doe@bri.co.id"},
		});
		expect(getByTestId("email")).toHaveAttribute("value", "john.doe@bri.co.id");

		fireEvent.click(getByTestId("radio-admin"));
		expect(getByTestId("radio-admin")).toBeChecked();

		fireEvent.change(getByTestId("password"), {
			target: {value: "123456"},
		});
		expect(getByTestId("password")).toHaveAttribute("value", "123456");

		expect(getByTestId("submit-add-user-modal-btn")).toHaveAttribute(
			"disabled",
			"",
		);
	});
});
