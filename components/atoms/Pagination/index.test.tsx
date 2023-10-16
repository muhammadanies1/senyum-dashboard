import React from "react";

import {render, screen} from "@testing-library/react";

import Pagination from "./"; // Ganti path import sesuai struktur proyek Anda

describe("Pagination component", () => {
	it("renders correctly for the first page", () => {
		const props = {
			pageCount: 10,
			page: 1,
		};

		render(<Pagination {...props} />);

		expect(screen.getByText("...")).toBeInTheDocument();
		expect(screen.getByText("1")).toBeInTheDocument();
	});

	it("renders correctly for an intermediate page", () => {
		const props = {
			pageCount: 10,
			page: 5,
		};

		render(<Pagination {...props} />);

		expect(screen.getByText("...")).toBeInTheDocument();
		expect(screen.getByText("1")).toBeInTheDocument();
	});

	it("renders correctly for the last page", () => {
		const props = {
			pageCount: 10,
			page: 10,
		};

		render(<Pagination {...props} />);

		expect(screen.getByText("...")).toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();
	});

	it("handles custom class names", () => {
		const props = {
			pageCount: 10,
			page: 1,
			className: "custom-class",
		};

		render(<Pagination {...props} />);

		expect(screen.getByText("...")).toHaveClass("custom-class");
		expect(screen.getByText("1")).toHaveClass("custom-class");
	});
});
