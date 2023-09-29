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
			date: "01 Jul 23, 12:00",
			name: "Ihsan Zubaidi",
			nik: "1234567890115551",
			no_hp: "081313454550",
			partner: "End User",
			status: "initiated",
		},
		{
			date: "01 Jul 23, 12:00",
			name: "Ihsan Zubaidi",
			nik: "1234567890115551",
			no_hp: "081313454550",
			partner: "End User",
			status: "initiated",
		},
		{
			date: "01 Jul 23, 12:00",
			name: "Ihsan Zubaidi",
			nik: "1234567890115551",
			no_hp: "081313454550",
			partner: "End User",
			status: "initiated",
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
						{dataSources.map((item, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{item.date}</td>
								<td>{item.name}</td>
								<td>{item.nik}</td>
								<td>{item.no_hp}</td>
								<td>{item.partner}</td>
								<td>{item.status}</td>
								<td className="flex gap-4">
									<span className="text-blue-80 font-semibold text-sm underline underline-offset-1 cursor-pointer">
										Detail
									</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 14 14"
										fill="none"
									>
										<path
											opacity="0.5"
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M0.538462 8.61539C0.835846 8.61539 1.07692 8.85646 1.07692 9.15385C1.07692 10.1844 1.07807 10.9032 1.15098 11.4455C1.22181 11.9723 1.35136 12.2512 1.55006 12.4499C1.74876 12.6486 2.02774 12.7782 2.55455 12.849C3.09685 12.9219 3.8156 12.9231 4.84615 12.9231H9.15385C10.1844 12.9231 10.9031 12.9219 11.4455 12.849C11.9723 12.7782 12.2512 12.6486 12.4499 12.4499C12.6486 12.2512 12.7782 11.9723 12.849 11.4455C12.9219 10.9032 12.9231 10.1844 12.9231 9.15385C12.9231 8.85646 13.1642 8.61539 13.4615 8.61539C13.7589 8.61539 14 8.85646 14 9.15385V9.19324C14 10.1751 14 10.9665 13.9163 11.589C13.8295 12.2352 13.6436 12.7793 13.2114 13.2114C12.7793 13.6436 12.2352 13.8295 11.5889 13.9163C10.9665 14 10.1751 14 9.19324 14H4.80676C3.8249 14 3.03349 14 2.41105 13.9163C1.76482 13.8295 1.2207 13.6436 0.788559 13.2114C0.356414 12.7793 0.170542 12.2352 0.0836582 11.589C-2.63552e-05 10.9665 -1.4414e-05 10.1751 3.92357e-07 9.19325C6.06322e-07 9.18015 8.20288e-07 9.16701 8.20288e-07 9.15385C8.20288e-07 8.85646 0.241078 8.61539 0.538462 8.61539Z"
											fill="#1078CA"
										/>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M7.0001 10.4102C7.15128 10.4102 7.29549 10.3467 7.3975 10.2351L10.2693 7.0941C10.47 6.87462 10.4547 6.53403 10.2352 6.33336C10.0158 6.1327 9.67516 6.14795 9.4745 6.36742L7.53856 8.48485V0.538453C7.53856 0.24107 7.29749 -7.62939e-06 7.0001 -7.62939e-06C6.70272 -7.62939e-06 6.46164 0.24107 6.46164 0.538453V8.48485L4.52571 6.36742C4.32504 6.14795 3.98445 6.1327 3.76497 6.33336C3.54549 6.53403 3.53024 6.87462 3.73091 7.0941L6.6027 10.2351C6.70471 10.3467 6.84893 10.4102 7.0001 10.4102Z"
											fill="#1078CA"
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
