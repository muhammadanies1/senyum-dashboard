"use client";

import {UserCollectionResponse} from "app/api/user/route";
import ModalDeleteUser from "app/modal-delete-user";
import {useCallback, useEffect, useMemo, useState} from "react";
import ReactPaginate from "react-paginate";

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FilterUser from "@/components/atoms/FilterUser";
import Input from "@/components/atoms/Input";
import PageTitle from "@/components/atoms/PageTitle";
import Table from "@/components/atoms/Table";
import TableContainer from "@/components/atoms/TableContainer";

const Admin = () => {
	const [data, setData] = useState<UserCollectionResponse>();
	const [page, setPage] = useState<number>(1);
	const [isShowModalDelete, setIsShowModalDelete] = useState<boolean>(false);

	const fetchData = useCallback(
		async (page: number) => {
			try {
				const res = await fetch(`/api/user?page=${page}&limit=10`, {
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
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[data, page],
	);

	const handlePageClick = useCallback(
		(event: {selected: number}) => {
			setPage(event.selected + 1);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[page],
	);

	const pageCount = useMemo(() => {
		const total = data?.data.recordsFiltered || 0;
		return total / 10;
	}, [data?.data.recordsFiltered]);

	useEffect(() => {
		fetchData(page);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

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
				<Input
					placeholder="Cari Username/Nama/Email"
					className="w-[25.875rem]"
				/>
			</div>

			<div className="flex gap-4 items-center">
				<span className="title-filter"> Filter </span>
				<FilterUser>Super Admin</FilterUser>
				<FilterUser>Admin</FilterUser>
				<FilterUser>Viewer</FilterUser>
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
				className="container-pagination"
				pageLinkClassName="page-link"
				activeClassName="page-active"
				breakLabel="..."
				nextLabel={null}
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel={null}
				renderOnZeroPageCount={null}
			/>
		</Card>
	);
};

export default Admin;
