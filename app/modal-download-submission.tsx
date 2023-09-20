"use client";

import React, {HTMLAttributes, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormMessage from "@/components/atoms/FormMessage";
import FormGroup from "@/components/atoms/FormGroup";
import Modal from "../components/molecules/Modal";
import Button from "../components/atoms/Button";
import Radio from "../components/atoms/Radio";
import Label from "@/components/atoms/Label";
import Image from "next/image";

import DownloadIcon from "./download.svg";

const schema = yup.object({
	format: yup
		.mixed()
		.oneOf(["xls", "csv"], "Format file tidak valid.")
		.required("Format file harus diisi."),
});

type Props = HTMLAttributes<HTMLDivElement>;

const ModalDownloadSubmission = (props: Props) => {
	const [isShow, setIsShow] = useState<boolean>(false);

	const {
		control,
		handleSubmit,
		formState: {isValid},
	} = useForm({
		values: {
			format: {},
		},
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
				className="gap-2 items-center justify-center"
			>
				<Image src={DownloadIcon} alt="download" />
				<span className="font-bold">Download Data Pengajuan</span>
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
					>
						Download Data Pengajuan
					</Modal.Header>
					<Modal.Body id="modal-body" data-testid="modal-body">
						<Controller
							control={control}
							name="format"
							render={({field: {value, onChange}, fieldState: {error}}) => (
								<FormGroup>
									<Label
										htmlFor="format-file"
										aria-label="Format File Label"
										data-testid="label-formatfile"
									>
										Format File
									</Label>
									<div id="format-file" className="flex mt-2">
										<Radio
											id="radio-xls"
											data-testid="radio-xls"
											label=".xls"
											name="format-option"
											className="w-full"
											value="xls"
											checked={value === "xls"}
											onChange={onChange}
										/>
										<Radio
											id="radio-csv"
											data-testid="radio-csv"
											label=".csv"
											name="format-option"
											className="w-full"
											value="csv"
											checked={value === "csv"}
											onChange={onChange}
										/>
									</div>
									{error?.message ? (
										<FormMessage variant="danger">{error?.message}</FormMessage>
									) : (
										false
									)}
								</FormGroup>
							)}
						/>
					</Modal.Body>
					<Modal.Footer id="modal-footer" data-testid="modal-footer">
						<Button
							id="submit-modal-btn"
							data-testid="submit-modal-btn"
							className="w-full"
							disabled={!isValid}
						>
							Download
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

export default ModalDownloadSubmission;
