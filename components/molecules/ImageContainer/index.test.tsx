import React from "react";

import {fireEvent, render, screen} from "@testing-library/react";

import ImageContainer from "./";

describe("ImageContainer Component", () => {
	it("renders an image when `src` is not empty", () => {
		render(
			<ImageContainer
				data-testid="image-container"
				alt="Test Image"
				src="your-base64-encoded-image-data-here"
			/>,
		);

		// Ensure that the image is loaded
		const image = screen.getByTestId("image-container");
		expect(image).toBeInTheDocument();

		fireEvent.load(image);
	});

	it('renders "No Image" when `src` is empty', () => {
		render(
			<ImageContainer data-testid="image-container" alt="Test Image" src="" />,
		);

		// Ensure that "No Image" is displayed
		const noImageText = screen.getByText("No Image");
		expect(noImageText).toBeInTheDocument();
	});

	it("renders a loading placeholder when `src` is not loaded", () => {
		render(<ImageContainer alt="Test Image" src="" />);

		// Ensure that the loading placeholder with class "animate-pulse" is displayed
		const loadingPlaceholder = screen.getByTestId("loading-placeholder");
		expect(loadingPlaceholder).toBeInTheDocument();
		expect(loadingPlaceholder).toHaveClass("animate-pulse");
	});
});
