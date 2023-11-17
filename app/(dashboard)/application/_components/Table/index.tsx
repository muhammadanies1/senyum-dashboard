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

import FilterApplicationSimpedesUMi from "@/app/(dashboard)/application/_components/FilterApplicationSimpedesUMi";
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
import Toast from "@/components/molecules/Toast";
import axiosInstance from "@/config/client/axios";
import {SimpedesUmiApplicationCollectionParams} from "@/types/SimpedesUmiApplicationCollectionParams";
import {SimpedesUmiApplicationCollectionResponse} from "@/types/SimpedesUmiApplicationCollectionResponse";
import {userTypeID} from "@/types/UserTypeID";

import DetailApplicationModal from "../DetailApplicationModal";
import DownloadApplicationBulkModal from "../DownloadApplicationBulkModal";
import DownloadApplicationDetailModal from "../DownloadApplicationDetailModal";

type ApplicationTableProps = {
	userTypeId: userTypeID;
};
type InputSearch = {
	search: string;
};

const ApplicationTable: FunctionComponent<ApplicationTableProps> = ({
	userTypeId,
}) => {
	const [params, setParams] = useState<SimpedesUmiApplicationCollectionParams>({
		page: 1,
		limit: 10,
	});

	const [isShowToast, setIsShowToast] = useState<boolean>(false);
	const [toastStatus, setToastStatus] = useState<boolean>();
	const [toastMessage, setToastMessage] = useState<string>();

	const [isShowDetailModal, setIsShowDetailModal] = useState<boolean>(false);
	const [isShowDownloadBulkModal, setIsShowDownloadBulkModal] =
		useState<boolean>(false);
	const [isShowDownloadDetailModal, setIsShowDownloadDetailModal] =
		useState<boolean>(false);

	const [selectedName, setSelectedName] = useState<string>();
	const [selectedApplication, setSelectedApplication] = useState<string>();

	const [searchBy, setSearchBy] = useState<string>();
	const [data, setData] = useState<SimpedesUmiApplicationCollectionResponse>();
	const [isDataNotFound, setIsDataNotFound] = useState<boolean>(false);
	const [isFilterApplication, setIsFilterApplication] = useState(false);

	const {control, handleSubmit, resetField, setValue} = useForm<InputSearch>({
		values: {search: ""},
	});

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
			const newParams: SimpedesUmiApplicationCollectionParams = {
				...params,
				page: event.selected + 1,
			};
			setParams(newParams);

			fetchData(newParams);
		},
		[fetchData, params],
	);

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
		({search}: InputSearch) => {
			if (searchBy && search) {
				const newParams: SimpedesUmiApplicationCollectionParams = {
					page: 1,
					limit: 10,
				};

				Object.assign(newParams, {
					[searchBy]: search,
				});

				setParams(newParams);
				fetchData(newParams);
			} else {
				const resetParams = {page: 1, limit: 10};

				setParams(resetParams);
				fetchData(resetParams);
			}
		},
		[fetchData, searchBy],
	);

	const clearFilter = useCallback(() => {
		const resetParams: SimpedesUmiApplicationCollectionParams = {
			page: 1,
			limit: 10,
		};
		resetField("search");
		setValue("search", "");
		setSearchBy(undefined);
		setParams(resetParams);
	}, [resetField, setValue]);

	const handleForward = useCallback(() => {
		const newParams = {...params, page: pageCount};
		setParams(newParams);
	}, [pageCount, params]);

	const handleBackward = useCallback(() => {
		const newParams = {...params, page: 1};
		setParams(newParams);
	}, [params]);

	const handleClickFilterApplication = useCallback(() => {
		setIsFilterApplication(!isFilterApplication);
	}, [isFilterApplication]);

	const handleApplyFilter = useCallback(
		(args: SimpedesUmiApplicationCollectionParams) => {
			setParams(args);
		},
		[],
	);

	const deleteFilterDate = useCallback(() => {
		const newParams = {...params};
		delete newParams?.startDate;
		delete newParams?.endDate;
		setParams(newParams);
	}, [params]);

	const resetFilter = useCallback(() => {
		const newParams = {...params};

		delete newParams?.startDate;
		delete newParams?.endDate;
		delete newParams?.partnerName;
		delete newParams?.status;

		setParams(newParams);
	}, [params]);

	const listFilterPartner = useMemo(() => {
		if (!params?.partnerName) {
			return;
		}
		const filterPartner = params?.partnerName;
		const arrFilterPartner = filterPartner.split(",");

		return arrFilterPartner;
	}, [params?.partnerName]);

	const filterStatusList = useMemo(() => {
		if (!params?.status) {
			return;
		}
		const filterStatus = params?.status;
		const arrFilterStatus = filterStatus.split(",");

		return arrFilterStatus;
	}, [params?.status]);

	const deleteFilterPartnerStatus = useCallback(
		(filterName: string, valueFilter: string) => {
			switch (filterName) {
				case "partner":
					if (params?.partnerName !== "") {
						const partnerListFiltered = listFilterPartner?.filter(
							(item) => item !== valueFilter,
						);
						const newFilterPartner = partnerListFiltered?.join(",");
						const newParams = {...params, partnerName: newFilterPartner};
						setParams(newParams);
					}

					break;
				case "status":
					if (params?.status !== "") {
						const statusListFiltered = filterStatusList?.filter(
							(item) => item !== valueFilter,
						);
						const newFilterStatus = statusListFiltered?.join(",");
						const newParamsStatus = {...params, status: newFilterStatus};
						setParams(newParamsStatus);
					}
					break;
			}
		},
		[filterStatusList, listFilterPartner, params],
	);

	useEffect(() => {
		fetchData(params);
	}, [fetchData, params]);

	return (
		<Card
			className={"flex flex-col gap-6".concat(
				data?.data?.data?.length === 0 && (searchBy || params.search)
					? " h-full"
					: "",
			)}
		>
			<div className="flex justify-between items-center">
				<PageTitle>Pengajuan Simpedes UMi</PageTitle>
				{userTypeId !== "VIEWER" ? (
					<Button
						variant="primary-outline"
						className="gap-2"
						onClick={() => {
							setIsShowDownloadBulkModal(true);
						}}
					>
						<i className="fa fa-download"></i>
						Download Data Pengajuan
					</Button>
				) : (
					false
				)}
			</div>

			<div className="flex justify-between items-center">
				<div className="flex gap-2">
					<Dropdown
						id="dropdown-search"
						data-testid="dropdown-search"
						label={
							<div className="container-label-search">
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
										className="w-[25.875rem] pl-10"
										placeholder="Cari Data"
										{...field}
									/>
									<i className="fa-solid fa-search icon pointer-events-none left-3"></i>
									{field.value ? (
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
				</div>
				<FilterApplicationSimpedesUMi
					id="dropdown-filter-application"
					data-testid="dropdown-filter-application"
					label={
						<div
							className={"dropdown-filter-application "}
							onClick={handleClickFilterApplication}
						>
							<i className="fa fa-filter text-blue-80"></i>
							<span className="text-dark-40 font-medium text-base">Filter</span>
						</div>
					}
					params={params}
					onApplyFilter={handleApplyFilter}
				/>
			</div>

			{(params?.startDate && params?.endDate) !== undefined ||
			params?.partnerName !== undefined ||
			params?.status !== undefined ? (
				<div className="flex flex-wrap gap-4">
					{params?.startDate && params?.endDate !== "" ? (
						<div className="px-2.5 py-2 rounded-lg bg-light-10 flex gap-2.5 items-center">
							<span className="text-dark-10 text-sm font-semibold">{`${params?.startDate.replace(
								/-/g,
								"/",
							)} - ${
								params?.endDate ? params?.endDate.replace(/-/g, "/") : "-"
							}`}</span>
							<button onClick={deleteFilterDate}>
								<i className="fa fa-circle-xmark text-light-80"></i>
							</button>
						</div>
					) : null}
					{params?.partnerName !== undefined
						? listFilterPartner?.map((item, index) => (
								<div
									key={index}
									className="px-2.5 py-2 rounded-lg bg-light-10 flex gap-2.5 items-center"
								>
									<span className="text-dark-10 text-sm font-semibold">{`${item}`}</span>
									<button
										onClick={() => deleteFilterPartnerStatus("partner", item)}
									>
										<i className="fa fa-circle-xmark text-light-80"></i>
									</button>
								</div>
						  ))
						: null}
					{params?.status !== undefined
						? filterStatusList?.map((item, index) => (
								<div
									key={index}
									className="px-2.5 py-2 rounded-lg bg-light-10 flex gap-2.5 items-center"
								>
									<span className="text-dark-10 text-sm font-semibold">{`${item}`}</span>
									<button
										onClick={() => deleteFilterPartnerStatus("status", item)}
									>
										<i className="fa fa-circle-xmark text-light-80"></i>
									</button>
								</div>
						  ))
						: null}
					<button
						className="text-blue-80 font-normal text-base"
						onClick={resetFilter}
					>
						Reset Filter
					</button>
				</div>
			) : null}

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
							{data !== undefined && data?.data?.data?.length !== 0 ? (
								data?.data?.data?.map((item, index) => (
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
														setSelectedName(item.custName);
														setSelectedApplication(item.id);
														setIsShowDetailModal(true);
													}}
													transparent
												>
													Detail
												</Button>
												{userTypeId !== "VIEWER" ? (
													<Button
														id="show-download-modal-btn"
														data-testid="show-download-modal-btn"
														onClick={() => {
															setSelectedName(item.custName);
															setSelectedApplication(item.id);
															setIsShowDownloadDetailModal(true);
														}}
														transparent
													>
														<i className="fa fa-download"></i>
													</Button>
												) : (
													false
												)}
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td className="!text-center" colSpan={8}>
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
				forward={handleForward}
				backward={handleBackward}
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

			<DetailApplicationModal
				userTypeId={userTypeId}
				isShow={isShowDetailModal}
				handleClose={() => setIsShowDetailModal(false)}
				selectedApplication={selectedApplication}
				handleShowDownloadModal={() => setIsShowDownloadDetailModal(true)}
			/>

			<DownloadApplicationBulkModal
				isShow={isShowDownloadBulkModal}
				handleClose={() => setIsShowDownloadBulkModal(false)}
				onError={(error) => {
					const errorMessage = new Error(error as any).message;
					setToastStatus(false);
					setIsShowToast(true);
					setToastMessage(errorMessage);
					setIsShowDownloadBulkModal(false);
				}}
			/>

			<DownloadApplicationDetailModal
				isShow={isShowDownloadDetailModal}
				handleClose={() => setIsShowDownloadDetailModal(false)}
				selectedName={selectedName}
				selectedApplication={selectedApplication}
				onError={(error) => {
					const errorMessage = new Error(error as any).message;
					setToastStatus(false);
					setIsShowToast(true);
					setToastMessage(errorMessage);
					setIsShowDownloadDetailModal(false);
				}}
			/>
		</Card>
	);
};

export default ApplicationTable;
