"use client";

import Image from "next/image";
import React, {HTMLAttributes, useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import {yupResolver} from "@hookform/resolvers/yup";

import TrashIcon from "./trash.svg";

const schema = yup.object({});

type Props = HTMLAttributes<HTMLDivElement>;

const ModalDeleteUser = (props: Props) => {
	const [isShow, setIsShow] = useState<boolean>(false);

	const {
		control,
		handleSubmit,
		formState: {isValid},
	} = useForm({
		values: {},
		resolver: yupResolver(schema),
		mode: "all",
	});

	const submitForm = (data: yup.InferType<typeof schema>) => {
		alert(`data: ${JSON.stringify(data)}`);
		setIsShow((state) => !state);
	};

	return (
		<>
			<Button
				id="show-modal-btn"
				data-testid="show-modal-btn"
				onClick={() => setIsShow(true)}
				transparent
			>
				<Image src={TrashIcon} alt="trash" />
			</Button>

			<Modal
				id="modal-form"
				data-testid="modal-form"
				isShow={isShow}
				className="w-[482px]"
				onClickBackground={() => setIsShow((state) => !state)}
			>
				<form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
					<Modal.Header
						id="modal-header"
						data-testid="modal-header"
						dismissable
						handleClose={() => setIsShow((state) => !state)}
						className="text-center"
					>
						Hapus User
					</Modal.Header>
					<Modal.Body
						id="modal-body"
						data-testid="modal-body"
						className="text-center font-semibold"
					>
						Apakah Anda yakin akan menghapus data user ini?
					</Modal.Body>
					<Modal.Footer
						id="modal-footer"
						data-testid="modal-footer"
						className="flex gap-2"
					>
						<Button
							id="cancel-modal-btn"
							data-testid="cancel-modal-btn"
							size="lg"
							type="button"
							transparent
							className="w-full"
							onClick={() => setIsShow((state) => !state)}
						>
							Tidak
						</Button>
						<Button
							id="submit-modal-btn"
							data-testid="submit-modal-btn"
							size="lg"
							variant="danger"
							className="w-full"
						>
							Ya, Hapus
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

export default ModalDeleteUser;
