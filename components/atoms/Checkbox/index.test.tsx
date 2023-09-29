import React from "react";

import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Checkbox from "./";

test("Checkbox renders correctly with label", () => {
	const {getByText} = render(<Checkbox label="Test Checkbox" />);

	// Ensure the label text is displayed
	const labelText = getByText("Test Checkbox");
	expect(labelText).toBeInTheDocument();

	// Ensure the checkbox is not checked by default
	const checkbox = getByText("Test Checkbox").previousElementSibling;
	expect(checkbox).not.toBeChecked();

	// Simulate a click event on the checkbox
	userEvent.click(checkbox as Element);

	// Ensure the checkbox is now checked
	expect(checkbox).toBeChecked();
});

test("Checkbox can be disabled", () => {
	const {getByText} = render(<Checkbox label="Disabled Checkbox" disabled />);

	// Ensure the checkbox is disabled
	const checkbox = getByText("Disabled Checkbox").previousElementSibling;
	expect(checkbox).toBeDisabled();
});
