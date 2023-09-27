"use client";

import {FunctionComponent, useState} from "react";

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import PageTitle from "@/components/atoms/PageTitle";
import Table from "@/components/atoms/Table";
import TableContainer from "@/components/atoms/TableContainer";
import DropdownFilter from "@/components/molecules/FilterDropdown";

const Application: FunctionComponent = () => {
	const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);

	const onClickDropdown = () => {
		setIsShowDropdown(!isShowDropdown);
	};

	const dataSources = [
		{
			username: "90123456",
			name: "anies",
			email: "anies@work.bri.co.id",
			userTypeId: "ADMIN",
		},
		{
			username: "90123457",
			name: "fred",
			email: "fred@work.bri.co.id",
			userTypeId: "VIEWER",
		},
		{
			username: "90123458",
			name: "zain",
			email: "zain@work.bri.co.id",
			userTypeId: "SUPER_ADMIN",
		},
	];

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
							<th>Username</th>
							<th>Nama</th>
							<th>Email Kantor</th>
							<th>Tipe User</th>
							<th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{dataSources.map((item, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{item.username}</td>
								<td>{item.name}</td>
								<td>{item.email}</td>
								<td>{item.userTypeId}</td>
								<td className="flex gap-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
									>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M1.55053 2.7172C1.90303 2.3647 2.38112 2.16667 2.87963 2.16667H7.41667C7.73883 2.16667 8 2.42783 8 2.75C8 3.07217 7.73883 3.33333 7.41667 3.33333H2.87963C2.69054 3.33333 2.5092 3.40845 2.37549 3.54216C2.24178 3.67586 2.16667 3.85721 2.16667 4.0463V13.1204C2.16667 13.3095 2.24178 13.4908 2.37549 13.6245C2.5092 13.7582 2.69054 13.8333 2.87963 13.8333H11.9537C12.1428 13.8333 12.3241 13.7582 12.4578 13.6245C12.5916 13.4908 12.6667 13.3095 12.6667 13.1204V8.58333C12.6667 8.26117 12.9278 8 13.25 8C13.5722 8 13.8333 8.26117 13.8333 8.58333V13.1204C13.8333 13.6189 13.6353 14.097 13.2828 14.4495C12.9303 14.802 12.4522 15 11.9537 15H2.87963C2.38112 15 1.90303 14.802 1.55053 14.4495C1.19803 14.097 1 13.6189 1 13.1204V4.0463C1 3.54779 1.19803 3.0697 1.55053 2.7172Z"
											fill="#1078CA"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M13.1022 2.16667C12.9209 2.16667 12.7388 2.24315 12.5983 2.39295L6.81862 8.558L6.45668 10.1023L7.83371 9.73507L13.6061 3.57784C13.7478 3.42676 13.8333 3.21425 13.8333 2.9854C13.8333 2.75654 13.7478 2.54404 13.6061 2.39295C13.4657 2.24315 13.2835 2.16667 13.1022 2.16667ZM11.7472 1.59502C12.0998 1.21895 12.5863 1 13.1022 1C13.6181 1 14.1047 1.21895 14.4572 1.59502C14.8086 1.96982 15 2.47055 15 2.9854C15 3.50024 14.8086 4.00098 14.4572 4.37577L8.57075 10.6547C8.49619 10.7342 8.40083 10.7913 8.29549 10.8194L5.81697 11.4803C5.6189 11.5331 5.40764 11.4781 5.2605 11.3354C5.11336 11.1926 5.05195 10.9831 5.09872 10.7836L5.71835 8.1398C5.74169 8.04023 5.79079 7.94855 5.86073 7.87394L11.7472 1.59502Z"
											fill="#BBDEFA"
										/>
									</svg>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 14 14"
										fill="none"
									>
										<path
											d="M0.915462 5.26981C0.842973 4.82344 1.2075 4.4209 1.68419 4.4209H12.3155C12.7922 4.4209 13.1567 4.82344 13.0842 5.26981L11.8694 12.7502C11.7527 13.4692 11.0997 13.9998 10.332 13.9998H3.66771C2.89992 13.9998 2.24699 13.4692 2.13023 12.7502L0.915462 5.26981Z"
											fill="#E84040"
										/>
										<path
											d="M0 2.21053C0 1.80358 0.348227 1.47368 0.777778 1.47368H2.63042C2.92502 1.47368 3.19433 1.316 3.32608 1.06637L3.67392 0.407319C3.80567 0.157684 4.07498 0 4.36958 0H9.63044C9.92499 0 10.1943 0.157684 10.3261 0.407319L10.6739 1.06637C10.8057 1.316 11.075 1.47368 11.3696 1.47368H13.2222C13.6518 1.47368 14 1.80358 14 2.21053C14 2.61747 13.6518 2.94737 13.2222 2.94737H0.777778C0.348227 2.94737 0 2.61747 0 2.21053Z"
											fill="#F9CFCF"
										/>
									</svg>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</TableContainer>
		</Card>
	);
};

export default Application;
