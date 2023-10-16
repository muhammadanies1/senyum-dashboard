"use client";

import {AxiosResponse} from "axios";
import {
	FunctionComponent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import ReactPaginate from "react-paginate";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import PageTitle from "@/components/atoms/PageTitle";
import Pagination from "@/components/atoms/Pagination";
import Table from "@/components/atoms/Table";
import TableContainer from "@/components/atoms/TableContainer";
import DropdownFilter from "@/components/molecules/FilterDropdown";
import axiosInstance from "@/config/client/axios";
import {SimpedesUmiApplicationCollectionParams} from "@/types/SimpedesUmiApplicationCollectionParams";
import {SimpedesUmiApplicationCollectionResponse} from "@/types/SimpedesUmiApplicationCollectionResponse";
import formatISODateToCustomFormat from "@/utils/formatISODateToCustomFormat";

const Application: FunctionComponent = () => {
	const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);

	const [params, setParams] = useState<SimpedesUmiApplicationCollectionParams>({
		page: 1,
		limit: 10,
	});

	const [data, setData] = useState<SimpedesUmiApplicationCollectionResponse>();

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

				setData(res?.data);
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

	return (
		<Card className="flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<PageTitle>Pengajuan Simpedes UMi</PageTitle>
				<Button variant="primary-outline" className="gap-2">
					<i className="fa fa-download"></i>
					Download Data Pengajuan
				</Button>
			</div>

			<div className="flex justify-between items-center">
				<Input placeholder="Cari Nama/NIK/No Telp" className="w-[25.875rem]" />
				<DropdownFilter
					isShowDropdown={isShowDropdown}
					onClickDropdown={onClickDropdown}
				/>
			</div>

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
						{data !== undefined ? (
							data?.data.data.map((item, index) => (
								<tr key={index}>
									<td>{tableNumber + (index + 1)}</td>
									<td>
										{item?.createdAt
											? formatISODateToCustomFormat(item?.createdAt)
											: "-"}
									</td>
									<td className="td-customer-name">
										{item?.custName ? item?.custName : "-"}
									</td>
									<td className="td-nik">{item?.idNo ? item?.idNo : "-"}</td>
									<td className="td-phone">
										{item?.cellPhoneNumber ? item?.cellPhoneNumber : "-"}
									</td>
									<td>{item?.partnerName ? item?.partnerName : "-"}</td>
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
											<span>Detail</span>
											<i className="fa fa-download"></i>
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
			<Pagination
				page={params?.page}
				pageCount={pageCount}
				onPageChange={handlePagination}
			/>
		</Card>
	);
};

export default Application;
