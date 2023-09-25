import React from "react";

import {faEye} from "@fortawesome/free-solid-svg-icons";
import {fireEvent, render} from "@testing-library/react";

import FormIcon from "./";

describe("FormIcon Component", () => {
	const mockOnClickIcon = jest.fn();

	it("renders children and icon properly", () => {
		const {container} = render(
			<FormIcon icon={faEye}>
				<div>Child Component</div>
			</FormIcon>,
		);

		// Check if the child component is rendered
		expect(container).toHaveTextContent("Child Component");

		// Check if the FontAwesomeIcon with the provided icon prop is rendered
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("calls onClickIcon callback when icon is clicked", () => {
		const {container} = render(
			<FormIcon icon={faEye} onClickIcon={mockOnClickIcon} />,
		);

		// Simulate a click on the icon
		const iconWrapper = container.querySelector(".icon-wrapper");
		if (!iconWrapper) {
			throw new Error("The element is does not exist.");
		}
		fireEvent.click(iconWrapper);

		// Check if the onClickIcon callback was called
		expect(mockOnClickIcon).toHaveBeenCalledTimes(1);
	});

	it('sets type attribute to "button" when iconWrapperTag is "button"', () => {
		const {container} = render(
			<FormIcon icon={faEye} iconWrapperTag="button" />,
		);

		// Check if the type attribute is set to "button"
		const buttonElement = container.querySelector("button");
		expect(buttonElement).toHaveAttribute("type", "button");
	});

	it("applies custom className when provided", () => {
		const {container} = render(
			<FormIcon icon={faEye} className="custom-class" />,
		);

		// Check if the custom className is applied
		expect(container.querySelector(".form-icon-wrapper")).toHaveClass(
			"custom-class",
		);
	});
});
