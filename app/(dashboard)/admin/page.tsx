"use client";

import {UserCollectionResponse} from "app/api/user/route";
import {useCallback, useEffect, useMemo, useState} from "react";
import ReactPaginate from "react-paginate";

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import PageTitle from "@/components/atoms/PageTitle";
import Table from "@/components/atoms/Table";
import TableContainer from "@/components/atoms/TableContainer";

const Admin = () => {
	const [data, setData] = useState<UserCollectionResponse>();

	const fetchData = useCallback(async () => {
		try {
			const res = await fetch("/api/user?page=1&limit=20", {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				const errRes = JSON.parse(await res.text());
				throw errRes;
			}

			setData(await res.json());
		} catch (error) {}
	}, []);

	const handlePageClick = useCallback((event: {selected: number}) => {
		console.log(event.selected);
	}, []);

	const pageCount = useMemo(() => {
		const total = data?.data.recordsFiltered || 0;
		return total / 20;
	}, [data?.data.recordsFiltered]);

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Card className="flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<PageTitle>Tabel User</PageTitle>
				<Button variant="primary-outline" className="gap-2">
					<i className="fa fa-circle-plus"></i>
					Tambah User
				</Button>
			</div>

			<div className="flex justify-between items-center">
				<Input placeholder="Cari Nama/NIK/No Telp" className="w-[25.875rem]" />
			</div>

			<div className="flex gap-4 items-center">
				<span className="font-medium text-base text-dark-20"> Filter </span>
				<div className="border border-light-30 text-xs font-semibold text-light-70 rounded-xl w-[98px] h-[32px] bg-light-10 flex justify-center items-center">
					<span> Super Admin </span>
				</div>
				<div className="border border-light-30 text-xs font-semibold text-light-70 rounded-xl w-[98px] h-[32px] bg-light-10 flex justify-center items-center">
					<span> Admin </span>
				</div>
				<div className="border border-light-30 text-xs font-semibold text-light-70 rounded-xl w-[98px] h-[32px] bg-light-10 flex justify-center items-center">
					<span> Viewer </span>
				</div>
			</div>

			<TableContainer>
				<Table>
					<thead>
						<tr>
							<th>No</th>
							<th>Username</th>
							<th>Nama</th>
							<th>Email Kantor</th>
							<th>Tipe User</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{data?.data.data.map((item, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{item.username}</td>
								<td>{item.name}</td>
								<td>{item.email}</td>
								<td>{item.userTypeId}</td>
								<td className="flex gap-4">
									<button className="text-primary-80">
										<i className="fas fa-edit"></i>
									</button>
									<button className="text-red-80">
										<i className="fas fa-trash"></i>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableContainer>
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
			/>
		</Card>
	);
};

export default Admin;
