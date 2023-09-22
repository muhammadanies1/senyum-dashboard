"use client";

import Image from "next/image";
import React, {HTMLAttributes, useState} from "react";

import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";

import ModalDownloadSubmission from "./modal-download-submission";
import PhotoKTP from "./photo-ktp.svg";
import PhotoSelfie from "./photo-selfie.svg";

type Props = HTMLAttributes<HTMLDivElement>;

const ModalDetailSubmission = (props: Props) => {
	const [isShow, setIsShow] = useState<boolean>(false);

	return (
		<>
			<Button
				id="show-modal-detail-btn"
				data-testid="show-modal-detail-btn"
				onClick={() => setIsShow(true)}
				transparent
				className="underline font-semibold"
			>
				Detail
			</Button>

			<Modal
				id="modal-detail-form"
				data-testid="modal-detail-form"
				isShow={isShow}
				className="w-[822px]"
				onClickBackground={() => setIsShow((state) => !state)}
			>
				<Modal.Header
					id="modal-detail-header"
					data-testid="modal-detail-header"
					dismissable
					handleClose={() => setIsShow((state) => !state)}
				>
					Detail Data Pengajuan
				</Modal.Header>
				<Modal.Body id="modal-detail-body" data-testid="modal-detail-body">
					<div className="flex flex-col bg-light-10 p-4 rounded-2xl gap-2.5 mb-6">
						<div className="flex items-center justify-between font-semibold text-base">
							Detail Status Pengajuan
							<ModalDownloadSubmission
								id="show-modal-download-btn"
								data-testid="show-modal-download-btn"
							/>
						</div>
						<div className="flex items-center justify-between gap-4">
							<div className="w-full flex items-center gap-2">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Status
								</span>
								<Badge text="INITIATED" status="pending" size="sm" />
							</div>
							<div className="w-full flex gap-2">
								<span className="w-1/3 text-dark-10 font-semibold text-base">
									Partner
								</span>
								<span className="font-semibold text-base">: End User</span>
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
										: 1234567890115551
									</span>
								</div>
								<div className="flex">
									<span className="w-1/3 text-dark-10 font-semibold text-base">
										Nama Lengkap
									</span>
									<span
										id="value-fullname"
										data-testid="value-fullname"
										className="w-2/3 font-semibold text-base"
									>
										: Ihsan Jubaidi
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
										: 081313454550
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
										: Laki-laki
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
										: Sukoharjo, 13 Okt 1979
									</span>
								</div>
								<div className="flex">
									<span className="w-1/3 text-dark-10 font-semibold text-base">
										Agama
									</span>
									<span
										id="value-religion"
										data-testid="value-religion"
										className="w-2/3 font-semibold text-base"
									>
										: Islam
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
										: Kawin
									</span>
								</div>
								<div className="flex">
									<span className="w-1/3 text-dark-10 font-semibold text-base">
										Nama Ibu Kandung
									</span>
									<span
										id="value-mothername"
										data-testid="value-mother-name"
										className="w-2/3 font-semibold text-base"
									>
										: Dini Suryati
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
										: SMA (Sekolah Menengah Atas)
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
										: Pedagang
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
										: -
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
										: Jl. Kemerdekaan No. 12, Tegal Raya, RT.03/RW.09, Pabelan,
										Kartasura, Kab. Sukoharjo, Jawa Tengah (57169)
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
										: Jl. Kemerdekaan No. 12, Tegal Raya, RT.03/RW.09, Pabelan,
										Kartasura, Kab. Sukoharjo, Jawa Tengah (57169)
									</span>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ModalDetailSubmission;
