"use client";

import React, {FunctionComponent, useCallback} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/atoms/Button";
import FormGroup from "@/components/atoms/FormGroup";
import Label from "@/components/atoms/Label";
import Radio from "@/components/atoms/Radio";
import Modal from "@/components/molecules/Modal";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
	format: yup
		.mixed()
		.oneOf(["pdf", "xls"], "Format file tidak valid.")
		.required("Format file harus diisi."),
});

type DownloadApplicationDetailProps = {
	selectedApplication?: string;
	handleClose: () => void;
	onSuccess: () => void;
	isShow: boolean;
};

const DownloadApplicationDetail: FunctionComponent<
	DownloadApplicationDetailProps
> = ({selectedApplication, handleClose, onSuccess, isShow}) => {
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

	const downloadDetail = useCallback(
		(data: yup.InferType<typeof schema>) => {
			const url = `${process.env.NEXT_PUBLIC_API_BFF_URL}/api/v1/simpedes-umi/detail/${data.format}/${selectedApplication}`;
			window.open(url, "_blank");
			onSuccess();
		},
		[onSuccess, selectedApplication],
	);

	const submitForm = (data: yup.InferType<typeof schema>) => {
		let timeout: NodeJS.Timeout | undefined = undefined;
		timeout && clearTimeout(timeout);
		setTimeout(() => {
			downloadDetail(data);
		}, 200);
	};

	return (
		<Modal
			id="modal-download-form"
			data-testid="modal-download-form"
			isShow={isShow}
			className="w-[482px]"
			containerClassName="z-20"
			onClickBackground={handleClose}
		>
			<form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
				<Modal.Header
					id="modal-download-header"
					data-testid="modal-download-header"
					dismissable
					handleClose={handleClose}
				>
					Download Data Pengajuan
				</Modal.Header>
				<Modal.Body id="modal-download-body" data-testid="modal-download-body">
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
										id="radio-pdf"
										data-testid="radio-pdf"
										label=".pdf"
										name="format-option"
										className="w-full"
										value="pdf"
										checked={value === "pdf"}
										onChange={onChange}
									/>
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
								</div>
							</FormGroup>
						)}
					/>
				</Modal.Body>
				<Modal.Footer
					id="modal-download-footer"
					data-testid="modal-download-footer"
				>
					<Button
						id="submit-modal-download-btn"
						data-testid="submit-modal-download-btn"
						className="w-full"
						disabled={!isValid}
					>
						Download
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default DownloadApplicationDetail;
