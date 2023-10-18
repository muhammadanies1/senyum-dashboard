"use client";

import "@/app/(dashboard)/application/style.css";

import {AxiosResponse} from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import {
	FunctionComponent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import {Controller, useForm} from "react-hook-form";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormIcon from "@/components/atoms/FormIcon";
import Input from "@/components/atoms/Input";
import PageTitle from "@/components/atoms/PageTitle";
import Pagination from "@/components/atoms/Pagination";
import Table from "@/components/atoms/Table";
import TableContainer from "@/components/atoms/TableContainer";
import Dropdown from "@/components/molecules/Dropdown";
import DropdownFilter from "@/components/molecules/FilterDropdown";
import axiosInstance from "@/config/client/axios";
import {SimpedesUmiApplicationCollectionParams} from "@/types/SimpedesUmiApplicationCollectionParams";
import {SimpedesUmiApplicationCollectionResponse} from "@/types/SimpedesUmiApplicationCollectionResponse";

import ModalDetailApplication from "./_components/DetailApplicationModal";
import ModalDownloadApplication from "./_components/DownloadApplicationModal";

type InputSearch = {
	search: string;
};

const Application: FunctionComponent = () => {
	const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
	const [isShowDetailModal, setIsShowDetailModal] = useState<boolean>(false);
	const [isShowDownloadModal, setIsShowDownloadModal] =
		useState<boolean>(false);
	const [selectedApplication, setSelectedApplication] = useState<string>();

	const [params, setParams] = useState<SimpedesUmiApplicationCollectionParams>({
		page: 1,
		limit: 10,
	});

	const [searchBy, setSearchBy] = useState<string>();
	const [searchKeyword, setSearchKeyword] = useState<string>();
	const [data, setData] = useState<SimpedesUmiApplicationCollectionResponse>();
	const [isDataNotFound, setIsDataNotFound] = useState<boolean>(false);

	const {control, handleSubmit, resetField, setValue} = useForm<InputSearch>();

	const onClickDropdown = () => {
		setIsShowDropdown(!isShowDropdown);
	};

	const fetchData = useCallback(
		async (params: SimpedesUmiApplicationCollectionParams) => {
			try {
				const res: AxiosResponse<SimpedesUmiApplicationCollectionResponse> =
					await axiosInstance.get("/api/application", {
						params,
					});
				const list = res?.data?.data?.data;
				if (
					(params?.nama || params?.nik || params?.noTelp) &&
					list.length < 1
				) {
					setIsDataNotFound(true);
					setData(res?.data);
					return;
				}
				setData(res?.data);
				setIsDataNotFound(false);
			} catch (error) {
				if (error) {
					setData(undefined);
				}
			}
		},
		[],
	);

	const handlePagination = useCallback(
		(event: {selected: number}) => {
			const newParams = {...params, page: event.selected + 1};
			setParams(newParams);

			fetchData(newParams);
		},
		[fetchData, params],
	);

	useEffect(() => {
		fetchData(params);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const pageCount = useMemo(() => {
		const total = data?.data.recordsFiltered || 0;
		return Math.ceil(total / 10);
	}, [data?.data.recordsFiltered]);

	const tableNumber = useMemo(() => {
		const numberOfTable: number = params?.page * 10 - 10;

		return numberOfTable;
	}, [params?.page]);

	const dropdownLabel = useMemo(() => {
		switch (searchBy) {
			case "nama":
				return "Nama";
			case "nik":
				return "NIK";
			case "noTelp":
				return "No Telp";

			default:
				break;
		}
	}, [searchBy]);

	const onSubmit = useCallback(
		(dataSearch: InputSearch) => {
			if (searchBy && dataSearch?.search) {
				const newParams = {...params, [searchBy as string]: dataSearch?.search};

				setSearchKeyword(dataSearch?.search);
				setParams(newParams);
				fetchData(newParams);
			} else {
				const resetParams = {page: 1, limit: 10};

				setParams(resetParams);
				fetchData(resetParams);
				setSearchKeyword(undefined);
			}
		},
		[fetchData, params, searchBy],
	);

	const clearFilter = useCallback(() => {
		const resetParams = {page: 1, limit: 10};
		resetField("search");
		setValue("search", "");
		setSearchBy(undefined);
		setSearchKeyword(undefined);
		setParams(resetParams);
	}, [resetField, setValue]);

	return (
		<Card
			className={"flex flex-col gap-6".concat(
				data?.data?.data.length === 0 && (searchBy || searchKeyword)
					? " h-full"
					: "",
			)}
		>
			<div className="flex justify-between items-center">
				<PageTitle>Pengajuan Simpedes UMi</PageTitle>
				<Button variant="primary-outline" className="gap-2">
					<i className="fa fa-download"></i>
					Download Data Pengajuan
				</Button>
			</div>

			<div className="flex justify-between items-center">
				<div className="flex gap-2">
					<Dropdown
						id="dropdown-search"
						data-testid="dropdown-search"
						label={
							<div className=" w-[11.25rem] h-[3rem] outline outline-light-20 rounded-xl flex gap-2 justify-between items-center px-3">
								<span
									className={"text-sm font-medium ".concat(
										searchBy ? " text-dark-40" : "text-light-40 ",
									)}
								>
									{searchBy ? dropdownLabel : "Nama/NIK/No Telp"}
								</span>
								<i
									className={"text-light-80".concat(
										searchBy
											? " fa-solid fa-xmark"
											: " fa-solid fa-chevron-down ",
									)}
									onClick={searchBy ? () => clearFilter() : undefined}
								></i>
							</div>
						}
						menus={[
							{
								label: "Nama",
								onClick: () => {
									setSearchBy("nama");
								},
							},
							{
								label: "NIK",
								onClick: () => {
									setSearchBy("nik");
								},
							},
							{
								label: "No Telp",
								onClick: () => {
									setSearchBy("noTelp");
								},
							},
						]}
					/>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Controller
							control={control}
							name="search"
							render={({field}) => (
								<FormIcon iconPosition="right">
									<Input
										className="w-[25.875rem]"
										placeholder="Cari Data"
										{...field}
									/>
									{searchKeyword ? (
										<button
											className="icon"
											id="btn-clear-search"
											data-testid="btn-clear-search"
											type="button"
											onClick={clearFilter}
										>
											<i className="fa-solid fa-circle-xmark text-light-40"></i>
										</button>
									) : null}
								</FormIcon>
							)}
						/>
					</form>
					{/* <Input placeholder="Cari Data" className="w-[25.875rem]" /> */}
				</div>
				<DropdownFilter
					isShowDropdown={isShowDropdown}
					onClickDropdown={onClickDropdown}
				/>
			</div>

			{isDataNotFound ? (
				<div className="flex justify-center h-full items-center">
					<div className="flex items-center flex-col w-[368.61px]">
						<Image src={require("./data-not-found.png")} alt="Not found" />
						<span className="text-xl text-dark-40 font-bold">
							{" "}
							Data Tidak Ditemukan{" "}
						</span>
						<button
							className="text-base text-blue-80 font-medium"
							onClick={clearFilter}
						>
							Reset Pencarian
						</button>
					</div>
				</div>
			) : (
				<TableContainer>
					<Table>
						<thead>
							<tr>
								<th>No</th>
								<th>Tanggal / Waktu</th>
								<th>Nama Nasabah</th>
								<th>NIK</th>
								<th>No Telepon</th>
								<th>Partner</th>
								<th>Status</th>
								<th>Aksi</th>
							</tr>
						</thead>
						<tbody>
							{data !== undefined && data?.data?.data.length !== 0 ? (
								data?.data.data.map((item, index) => (
									<tr key={index}>
										<td>{tableNumber + (index + 1)}</td>
										<td>
											{item?.createdAt
												? dayjs(item?.createdAt).format("DD MMM YY, HH:mm")
												: "-"}
										</td>
										<td className="td-customer-name">
											{item?.custName ? item?.custName : "-"}
										</td>
										<td className="td-nik">{item?.idNo ? item?.idNo : "-"}</td>
										<td className="td-phone">
											{item?.cellPhoneNumber ? item?.cellPhoneNumber : "-"}
										</td>
										<td className="td-partner-name">
											{item?.partnerName ? item?.partnerName : "-"}
										</td>
										<td>
											<Badge
												className="truncate"
												status={
													item?.status === "DONE_SUCCESS"
														? "success"
														: item?.status ===
														  ("CANCELED" ||
																"PENDING_ESB" ||
																"PRIVY_REGISTER_FAILED")
														? "error"
														: "pending"
												}
												text={item?.status}
											/>
										</td>
										<td>
											<div className="td-action">
												<Button
													id="show-detail-modal-btn"
													data-testid="show-detail-modal-btn"
													onClick={() => {
														setSelectedApplication(item.id);
														setIsShowDetailModal(true);
													}}
													transparent
													// disabled={!isEditable(item)}
												>
													Detail
												</Button>
												<Button
													id="show-download-modal-btn"
													data-testid="show-download-modal-btn"
													onClick={() => {
														setIsShowDownloadModal(true);
													}}
													transparent
													// disabled={!isEditable(item)}
												>
													<i className="fa fa-download"></i>
												</Button>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td className="!text-center" colSpan={6}>
										Tidak Ada Data
									</td>
								</tr>
							)}
						</tbody>
					</Table>
				</TableContainer>
			)}
			<Pagination
				page={params?.page}
				pageCount={pageCount}
				onPageChange={handlePagination}
			/>

			<ModalDetailApplication
				isShow={isShowDetailModal}
				handleClose={() => setIsShowDetailModal(false)}
				selectedApplication={selectedApplication}
			/>
			<ModalDownloadApplication
				isShow={isShowDownloadModal}
				handleClose={() => setIsShowDownloadModal(false)}
			/>
		</Card>
	);
};

export default Application;
