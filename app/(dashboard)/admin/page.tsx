"use client";

import {UserCollectionResponse} from "app/api/user/route";
import {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import ReactPaginate from "react-paginate";
import * as yup from "yup";

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FilterUser from "@/components/atoms/FilterUser";
import FormGroup from "@/components/atoms/FormGroup";
import FormIcon from "@/components/atoms/FormIcon";
import FormMessage from "@/components/atoms/FormMessage";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import PageTitle from "@/components/atoms/PageTitle";
import Table from "@/components/atoms/Table";
import TableContainer from "@/components/atoms/TableContainer";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
	search: yup.string().optional(),
	filter: yup.array().of(yup.string()).optional(),
	isSuperAdmin: yup.boolean().optional(),
	isAdmin: yup.boolean().optional(),
	isViewer: yup.boolean().optional(),
});

const Admin = () => {
	const [data, setData] = useState<UserCollectionResponse>();
	const [page, setPage] = useState<number>(1);
	const [isShowModalDelete, setIsShowModalDelete] = useState<boolean>(false);

	const {control, handleSubmit, watch} = useForm({
		values: {
			search: "",
			filter: undefined,
			isSuperAdmin: false,
			isAdmin: false,
			isViewer: false,
		},
		resolver: yupResolver(schema),
	});

	const fetchData = useCallback(async (page: number) => {
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
	}, []);

	const onSubmit = useCallback((data: yup.InferType<typeof schema>) => {
		console.log(data);
	}, []);

	const handlePageClick = useCallback((event: {selected: number}) => {
		setPage(event.selected + 1);
	}, []);

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
			<form
				action=""
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<div className="flex justify-between items-center">
					<PageTitle>Tabel User</PageTitle>
					<Button variant="primary-outline" className="gap-2" type="button">
						<i className="fa fa-circle-plus"></i>
						Tambah User
					</Button>
				</div>

				<Controller
					control={control}
					name="search"
					render={({field, fieldState: {error}}) => (
						<FormGroup className="mb-0">
							<FormIcon iconPosition="left">
								<Input
									placeholder="Cari Username/Nama/Email"
									className="w-[25.875rem]"
									variant={error ? "error" : undefined}
									{...field}
								/>
								<i className="fa-solid fa-search icon pointer-events-none"></i>
							</FormIcon>
							{error ? <FormMessage>{error?.message}</FormMessage> : false}
						</FormGroup>
					)}
				/>

				<FormGroup className="flex gap-4 items-center">
					<Label className="mb-0">Filter </Label>
					<Controller
						control={control}
						name="isSuperAdmin"
						render={({field: {value, ...attrs}, fieldState}) => (
							<label
								className={"checkbox-filter".concat(value ? " active" : "")}
							>
								<span>Super Admin</span>
								<input
									type="checkbox"
									value="isSuperAdmin"
									className="hidden"
									{...attrs}
								/>
							</label>
						)}
					/>
					<Controller
						control={control}
						name="isAdmin"
						render={({field: {value, ...attrs}, fieldState}) => (
							<label
								className={"checkbox-filter".concat(value ? " active" : "")}
							>
								<span>Admin</span>
								<input
									type="checkbox"
									value="isAdmin"
									className="hidden"
									{...attrs}
								/>
							</label>
						)}
					/>
					<Controller
						control={control}
						name="isViewer"
						render={({field: {value, ...attrs}, fieldState}) => (
							<label
								className={"checkbox-filter".concat(value ? " active" : "")}
							>
								<span>Viewer</span>
								<input
									type="checkbox"
									value="isViewer"
									className="hidden"
									{...attrs}
								/>
							</label>
						)}
					/>
				</FormGroup>
			</form>

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
