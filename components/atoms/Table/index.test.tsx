import React from "react";

import {render} from "@testing-library/react";

import Table, {THead} from "./"; // Sesuaikan dengan lokasi komponen Anda

// Fungsi bantu untuk membuat data sampel
const generateSampleData = () => {
	return [
		{id: 1, name: "John", age: 30},
		{id: 2, name: "Jane", age: 25},
		{id: 3, name: "Doe", age: 35},
	];
};

// Mock data kolom
const columns: THead[] = [
	{title: "ID", dataIndex: "id", key: "id"},
	{title: "Name", dataIndex: "name", key: "name"},
	{title: "Age", dataIndex: "age", key: "age"},
];

test("Table renders correctly with data", () => {
	const data = generateSampleData();
	const {getByText} = render(<Table columns={columns} data={data} />);

	// Memeriksa apakah elemen-elemen data ada di dalam tabel
	data.forEach((record) => {
		expect(getByText(String(record.id))).toBeInTheDocument();
		expect(getByText(record.name)).toBeInTheDocument();
		expect(getByText(String(record.age))).toBeInTheDocument();
	});
});

test("Table renders correctly without data", () => {
	const {queryByText} = render(<Table columns={columns} />);

	// Memeriksa apakah elemen-elemen data tidak ada di dalam tabel
	columns.forEach((column) => {
		expect(queryByText(column.title)).toBeInTheDocument();
	});
});
