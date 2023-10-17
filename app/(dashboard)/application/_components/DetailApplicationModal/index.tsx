"use client";

import {AxiosResponse} from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import React, {
	FunctionComponent,
	useCallback,
	useEffect,
	useState,
} from "react";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import axiosInstance from "@/config/client/axios";
import {SimpedesUmiApplicationDetailResponse} from "@/types/SimpedesUmiApplicationDetailResponse";

import ModalDownloadApplication from "../DownloadApplicationModal";
import PhotoKTP from "./photo-ktp.svg";
import PhotoSelfie from "./photo-selfie.svg";

type DetailApplicationProps = {
	selectedApplication?: string;
	handleClose: () => void;
	isShow: boolean;
};

const DetailApplication: FunctionComponent<DetailApplicationProps> = ({
	selectedApplication,
	handleClose,
	isShow,
}) => {
	const [isShowDownloadModal, setIsShowDownloadModal] =
		useState<boolean>(false);
	const [data, setData] = useState<SimpedesUmiApplicationDetailResponse>();

	const fetchDetail = useCallback(async () => {
		try {
			const res: AxiosResponse<SimpedesUmiApplicationDetailResponse> =
				await axiosInstance.get(`/api/application/${selectedApplication}`);

			setData(res.data);
		} catch (error) {
			if (error) {
				setData(undefined);
			}
		}
	}, [selectedApplication]);

	useEffect(() => {
		if (isShow === true) {
			fetchDetail();
		}
	}, [fetchDetail, isShow]);

	return (
		<Modal
			id="modal-detail-form"
			data-testid="modal-detail-form"
			isShow={isShow}
			className="w-[822px]"
			onClickBackground={handleClose}
		>
			<Modal.Header
				id="modal-detail-header"
				data-testid="modal-detail-header"
				dismissable
				handleClose={handleClose}
			>
				Detail Data Pengajuan
			</Modal.Header>
			<Modal.Body id="modal-detail-body" data-testid="modal-detail-body">
				<div className="flex flex-col bg-light-10 p-4 rounded-2xl gap-2.5 mb-6">
					<div className="flex items-center justify-between font-semibold text-base">
						Detail Status Pengajuan
						<Button
							id="show-download-modal-btn"
							data-testid="show-download-modal-btn"
							onClick={() => {
								setIsShowDownloadModal(true);
							}}
							transparent
						>
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
						</Button>
					</div>
					<div className="flex items-center justify-between gap-4">
						<div className="w-full flex items-center gap-2">
							<span className="w-1/3 text-dark-10 font-semibold text-base">
								Status
							</span>
							<Badge
								text={data?.data.status}
								status={
									data?.data.status === "DONE_SUCCESS"
										? "success"
										: data?.data.status ===
										  ("CANCELED" || "PENDING_ESB" || "PRIVY_REGISTER_FAILED")
										? "error"
										: "pending"
								}
								size="md"
							/>
						</div>
						<div className="w-full flex gap-2">
							<span className="w-1/3 text-dark-10 font-semibold text-base">
								Partner
							</span>
							<span className="font-semibold text-base">
								: {data?.data.partnerName}
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col bg-light-10 p-4 rounded-2xl gap-2.5">
					<span className="font-semibold text-base">
						Detail Pengajuan Nasabah
					</span>
					<div className="flex gap-4">
						<div className="w-full flex flex-col gap-3">
							<span className="font-semibold text-base">Foto KTP</span>
							<Image
								id="image-ktp"
								data-testid="image-ktp"
								src={PhotoKTP}
								alt="Photo KTP"
								className="w-full rounded-xl"
							/>
						</div>
						<div className="w-full flex flex-col gap-3">
							<span className="font-semibold text-base">Foto Selfie</span>
							<Image
								id="image-selfie"
								data-testid="image-selfie"
								src={PhotoSelfie}
								alt="Photo Selfie"
								className="w-full rounded-xl"
							/>
						</div>
					</div>
					<span className="font-semibold text-base">Data Nasabah</span>
					<div className="flex w-full gap-4">
						<div className="flex flex-col w-full gap-2">
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									NIK
								</span>
								<span
									id="value-nik"
									data-testid="value-nik"
									className="w-2/3 font-semibold text-base"
								>
									: {data?.data.idNo}
								</span>
							</div>
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Nama Lengkap
								</span>
								<span
									id="value-fullname"
									data-testid="value-fullname"
									className="w-2/3 font-semibold text-base capitalize"
								>
									: {data?.data.custName}
								</span>
							</div>
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									No Telepon
								</span>
								<span
									id="value-phone-number"
									data-testid="value-phone-number"
									className="w-2/3 font-semibold text-base"
								>
									: {data?.data.cellPhoneNumber}
								</span>
							</div>
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Jenis Kelamin
								</span>
								<span
									id="value-gender"
									data-testid="value-gender"
									className="w-2/3 font-semibold text-base"
								>
									: {data?.data.sex === "M" ? "Laki-laki" : "Perempuan"}
								</span>
							</div>
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Tempat, Tgl Lahir
								</span>
								<span
									id="value-birthdate"
									data-testid="value-birthdate"
									className="w-2/3 font-semibold text-base"
								>
									: {data?.data.placeOfBirth},{" "}
									{dayjs(data?.data.dateOfBirth).format("DD MMM YYYY")}
								</span>
							</div>
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Agama
								</span>
								<span
									id="value-religion"
									data-testid="value-religion"
									className="w-2/3 font-semibold text-base capitalize"
								>
									: {data?.data.religion}
								</span>
							</div>
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Status Perkawinan
								</span>
								<span
									id="value-marital-status"
									data-testid="value-marital-status"
									className="w-2/3 font-semibold text-base"
								>
									: {data?.data.maritalStatus}
								</span>
							</div>
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Nama Ibu Kandung
								</span>
								<span
									id="value-mothername"
									data-testid="value-mother-name"
									className="w-2/3 font-semibold text-base capitalize"
								>
									: {data?.data.motherName}
								</span>
							</div>
						</div>
						<div className="flex flex-col w-full gap-2">
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Pendidikan Terakhir
								</span>
								<span
									id="value-education"
									data-testid="value-education"
									className="w-2/3 font-semibold text-base"
								>
									: {data?.data.education}
								</span>
							</div>
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Pekerjaan
								</span>
								<span
									id="value-occupation"
									data-testid="value-occupation"
									className="w-2/3 font-semibold text-base"
								>
									: {data?.data.typeOfWork}
								</span>
							</div>
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Bidang Usaha
								</span>
								<span
									id="value-business-field"
									data-testid="value-business-field"
									className="w-2/3 font-semibold text-base"
								>
									: {data?.data.fieldWork}
								</span>
							</div>
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Alamat KTP
								</span>
								<span
									id="value-id-address"
									data-testid="value-id-address"
									className="w-2/3 font-semibold text-base"
								>
									: {data?.data.address}
								</span>
							</div>
							<div className="flex">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Alamat Tinggal
								</span>
								<span
									id="value-home-address"
									data-testid="value-home-address"
									className="w-2/3 font-semibold text-base"
								>
									: {data?.data.addressDom}
								</span>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>

			<ModalDownloadApplication
				isShow={isShowDownloadModal}
				handleClose={() => setIsShowDownloadModal(false)}
			/>
		</Modal>
	);
};

export default DetailApplication;
