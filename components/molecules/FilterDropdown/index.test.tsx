import React from "react";

import {fireEvent, render} from "@testing-library/react";

import DropdownFilter from "./";

describe("DropdownFilter", () => {
	it("renders correctly when isOpen is true", () => {
		const onClickDropdown = jest.fn();
		const {getByText} = render(
			<DropdownFilter
				onClickDropdown={onClickDropdown}
				isShowDropdown={true}
			/>,
		);

		expect(getByText("Filter")).toBeInTheDocument();
		expect(getByText("Tanggal")).toBeInTheDocument();
		expect(getByText("Dari")).toBeInTheDocument();
		expect(getByText("Hingga")).toBeInTheDocument();
		expect(getByText("Partner")).toBeInTheDocument();
		expect(getByText("End User")).toBeInTheDocument();
		expect(getByText("Seller PGD")).toBeInTheDocument();
		expect(getByText("Seller BRI")).toBeInTheDocument();
		expect(getByText("Seller PNM")).toBeInTheDocument();
		expect(getByText("Terapkan")).toBeInTheDocument();
	});

	it("calls onClickDropdown when button is clicked", () => {
		const onClickDropdown = jest.fn();
		const {getByText} = render(
			<DropdownFilter
				onClickDropdown={onClickDropdown}
				isShowDropdown={false}
			/>,
		);

		fireEvent.click(getByText("Filter"));
		expect(onClickDropdown).toHaveBeenCalled();
	});

	it("handles checkbox click", () => {
		const onClickDropdown = jest.fn();
		const {getByLabelText} = render(
			<DropdownFilter
				onClickDropdown={onClickDropdown}
				isShowDropdown={true}
			/>,
		);

		const endUserCheckbox = getByLabelText("End User");
		fireEvent.click(endUserCheckbox);
		expect(endUserCheckbox).toBeChecked();

		const sellerPGDCheckbox = getByLabelText("Seller PGD");
		fireEvent.click(sellerPGDCheckbox);
		expect(sellerPGDCheckbox).toBeChecked();
	});
});
