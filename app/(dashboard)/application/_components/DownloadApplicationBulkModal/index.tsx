"use client";

import dayjs from "dayjs";
import {Datepicker, Flowbite} from "flowbite-react";
import React, {FunctionComponent, useCallback, useEffect, useMemo} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/atoms/Button";
import FormGroup from "@/components/atoms/FormGroup";
import Label from "@/components/atoms/Label";
import Radio from "@/components/atoms/Radio";
import Modal from "@/components/molecules/Modal";
import {theme} from "@/config/theme";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
	format: yup
		.mixed()
		.oneOf(["pdf", "xls", "csv"], "Format file tidak valid.")
		.required("Format file harus diisi."),
	startDate: yup.string().required(),
	endDate: yup.string().required(),
});

type DownloadApplicationBulkProps = {
	selectedApplication?: string;
	handleClose: () => void;
	onSuccess: () => void;
	isShow: boolean;
};

const initialValue: yup.InferType<typeof schema> = {
	format: "",
	startDate: "",
	endDate: "",
};

const DownloadApplicationBulk: FunctionComponent<
	DownloadApplicationBulkProps
> = ({selectedApplication, handleClose, onSuccess, isShow}) => {
	const {
		control,
		handleSubmit,
		formState: {isValid},
		setValue,
		watch,
		reset,
	} = useForm({
		values: {
			...initialValue,
		},
		resolver: yupResolver(schema),
		mode: "all",
	});

	const watchStartDate = dayjs(watch("startDate")).toDate();
	const watchEndDate = dayjs(watch("endDate")).toDate();

	// const downloadBulk = useCallback(
	// 	(data: yup.InferType<typeof schema>) => {
	// 		const url = `${process.env.NEXT_PUBLIC_API_BFF_URL}/api/v1/simpedes-umi/detail/${data.format}/${data.startDate}${data.endDate}`;
	// 		window.open(url, "_blank");
	// 		onSuccess();
	// 	},
	// 	[onSuccess, selectedApplication],
	// );

	const handleStartDateChange = useCallback(
		(value: string) => {
			setValue("startDate", value);

			if (
				watchEndDate &&
				dayjs(value).isBefore(dayjs(watchEndDate).subtract(29, "day"))
			) {
				const newEndDate = dayjs(value).add(29, "day").toDate();
				setValue("endDate", newEndDate.toString());
			}

			if (watchEndDate && dayjs(value).isAfter(watchEndDate)) {
				setValue("endDate", value);
			}
		},
		[setValue, watchEndDate],
	);

	const maxEndDate = useMemo(() => {
		if (watchStartDate) {
			const endDate = dayjs(watchStartDate).add(29, "day");
			return endDate.isAfter(new Date()) ? new Date() : endDate.toDate();
		} else {
			return new Date();
		}
	}, [watchStartDate]);

	const submitForm = (data: yup.InferType<typeof schema>) => {
		let timeout: NodeJS.Timeout | undefined = undefined;
		timeout && clearTimeout(timeout);
		setTimeout(() => {
			// downloadBulk(data);
		}, 200);
	};

	useEffect(() => {
		reset(initialValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShow]);

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
				<Modal.Body
					id="modal-download-body"
					data-testid="modal-download-body"
					className="flex flex-col gap-4"
				>
					<div className="flex flex-col">
						<Label
							htmlFor="format-file"
							aria-label="Format File Label"
							data-testid="label-formatfile"
							className="label-filter-by"
						>
							Tanggal
						</Label>
						<div className="container-date-range flex-row gap-0">
							<Controller
								control={control}
								name="startDate"
								render={({field: {value, onChange}, fieldState: {error}}) => (
									<FormGroup>
										<div className="date-range">
											<span className="label-date-range">Dari</span>
											<Flowbite theme={{theme}}>
												<Datepicker
													showTodayButton={false}
													showClearButton={false}
													maxDate={new Date()}
													onSelectedDateChanged={(date) =>
														handleStartDateChange(date.toString())
													}
													type="text"
													value={value ? dayjs(value).format("DD/MM/YY") : ""}
													placeholder="Pilih Tanggal"
												/>
											</Flowbite>
										</div>
									</FormGroup>
								)}
							/>
							<Controller
								control={control}
								name="endDate"
								render={({field: {value, onChange}, fieldState: {error}}) => (
									<FormGroup>
										<div className="date-range">
											<span className="label-date-range">Hingga</span>
											<Flowbite theme={{theme}}>
												<Datepicker
													showTodayButton={false}
													showClearButton={false}
													minDate={watchStartDate ?? new Date()}
													maxDate={maxEndDate}
													onSelectedDateChanged={onChange}
													type="text"
													value={value ? dayjs(value).format("DD/MM/YY") : ""}
													placeholder="Pilih Tanggal"
												/>
											</Flowbite>
										</div>
									</FormGroup>
								)}
							/>
						</div>
						<span className="text-light-80 text-xs font-normal">
							Maksimal rentang data yang dapat diunduh adalah 30 hari
						</span>
					</div>
					<Controller
						control={control}
						name="format"
						render={({field: {value, onChange}, fieldState: {error}}) => (
							<FormGroup>
								<Label
									htmlFor="format-file"
									aria-label="Format File Label"
									data-testid="label-formatfile"
									className="label-filter-by"
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
										onClick={() => {
											setValue("format", "pdf");
										}}
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
										onClick={() => {
											setValue("format", "xls");
										}}
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
										onClick={() => {
											setValue("format", "csv");
										}}
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

export default DownloadApplicationBulk;
