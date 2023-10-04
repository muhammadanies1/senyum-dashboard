"use client";

import {AxiosResponse} from "axios";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import ReactPaginate from "react-paginate";
import * as yup from "yup";

import ModalDeleteUser from "@/app/(dashboard)/admin/modal-delete-user";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormGroup from "@/components/atoms/FormGroup";
import FormIcon from "@/components/atoms/FormIcon";
import FormMessage from "@/components/atoms/FormMessage";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import PageTitle from "@/components/atoms/PageTitle";
import Table from "@/components/atoms/Table";
import TableContainer from "@/components/atoms/TableContainer";
import Toast from "@/components/molecules/Toast";
import axiosInstance from "@/config/client/axios";
import {User} from "@/types/User";
import {UserCollectionParams} from "@/types/UserCollectionParams";
import {UserCollectionResponse} from "@/types/UserCollectionResponse";
import {yupResolver} from "@hookform/resolvers/yup";

import ModalAddUser from "./add-user";
import ModalEditUser from "./edit-user";

const schema = yup.object({
	search: yup.string().optional(),
	filter: yup.array().of(yup.string()).optional(),
	isSuperAdmin: yup.boolean().optional(),
	isAdmin: yup.boolean().optional(),
	isViewer: yup.boolean().optional(),
});

const Admin = () => {
	const [params, setParams] = useState<UserCollectionParams>({
		page: 1,
		limit: 10,
	});

	const [data, setData] = useState<UserCollectionResponse>();
	const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false);
	const [isShowToast, setIsShowToast] = useState<boolean>(false);
	const [toastStatus, setToastStatus] = useState<boolean>();
	const [toastMessage, setToastMessage] = useState<string>();
	const [selectedUser, setSelectedUser] = useState<User>();
	const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);

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

	const fetchData = useCallback(
		async (params: UserCollectionParams) => {
			try {
				if (isDeleteSuccess) {
					setIsDeleteSuccess(false);
				}

				const res: AxiosResponse<UserCollectionResponse> =
					await axiosInstance.get("/api/user", {
						params,
					});

				setData(res.data);
			} catch (error) {}
		},
		[isDeleteSuccess],
	);

	const onSubmit = useCallback((data: yup.InferType<typeof schema>) => {
		console.log(data);
	}, []);

	const handlePageClick = useCallback(
		(event: {selected: number}) => {
			const newParams = {...params, page: event.selected + 1};
			setParams(newParams);

			fetchData(newParams);
		},
		[fetchData, params],
	);

	const pageCount = useMemo(() => {
		const total = data?.data.recordsFiltered || 0;
		return Math.ceil(total / 10);
	}, [data?.data.recordsFiltered]);

	const handleSuccessDeleted = useCallback(() => {
		setIsDeleteSuccess(true);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDeleteSuccess]);

	useEffect(() => {
		fetchData(params);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params, isDeleteSuccess]);

	return (
		<Card className="flex flex-col gap-6">
			<form
				action=""
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<div className="flex justify-between items-center">
					<PageTitle>Tabel User</PageTitle>
					<ModalAddUser
						onSuccess={() =>
							fetchData({
								...params,
								page: 1,
								search: undefined,
								userId: undefined,
								sortBy: undefined,
							})
						}
					/>
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
									<Button
										id="show-modal-btn"
										data-testid="show-modal-btn"
										onClick={() => {
											setSelectedUser(item);
											setIsShowEditModal(true);
										}}
										transparent
									>
										<i className="fa-regular fa-pen-to-square"></i>
									</Button>
									<ModalDeleteUser
										idData={item?.id}
										onDeletedSuccess={handleSuccessDeleted}
									/>
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

			<Toast
				id="toast"
				data-testid="toast"
				status={toastStatus ? "success" : "error"}
				isShow={isShowToast}
				handleClose={() => {
					setIsShowToast(false);
				}}
			>
				{toastMessage}
			</Toast>

			<ModalEditUser
				isShow={isShowEditModal}
				handleClose={() => setIsShowEditModal(false)}
				userData={selectedUser}
				onSuccess={async () => {
					setToastStatus(true);
					setIsShowToast(true);
					setToastMessage("User berhasil diubah.");
					await fetchData({
						...params,
						page: 1,
						search: undefined,
						userId: undefined,
						sortBy: undefined,
					});
				}}
				onError={() => {
					setToastStatus(false);
					setIsShowToast(true);
					setToastMessage("User gagal diubah. Silakan coba lagi.");
				}}
			/>
		</Card>
	);
};

export default Admin;
