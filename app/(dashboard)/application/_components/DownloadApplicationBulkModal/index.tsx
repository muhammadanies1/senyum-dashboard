"use client";

import axios from "axios";
import dayjs from "dayjs";
import {Datepicker, Flowbite} from "flowbite-react";
import React, {FunctionComponent, useCallback, useMemo, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/atoms/Button";
import FormGroup from "@/components/atoms/FormGroup";
import Label from "@/components/atoms/Label";
import Radio from "@/components/atoms/Radio";
import Modal from "@/components/molecules/Modal";
import axiosInstance from "@/config/client/axios";
import {theme} from "@/config/theme";
import {SimpedesUmiApplicationDownloadTableResponse} from "@/types/SimpedesUmiApplicationDownloadTableResponse";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
	format: yup
		.mixed()
		.oneOf(["pdf", "xls", "csv"], "Format file tidak valid.")
		.required("Format file harus diisi."),
	startDate: yup.string().optional(),
	endDate: yup.string().when("startDate", {
		is: (startDate: string) => startDate && startDate.length > 0,
		then: () => yup.string().required(),
		otherwise: () => yup.string().optional(),
	}),
});

type DownloadApplicationBulkProps = {
	onError: (error: unknown) => void;
	onSuccess?: () => Promise<void>;
	handleClose: () => void;
	isShow: boolean;
};

const initialValue: yup.InferType<typeof schema> = {
	startDate: "",
	endDate: "",
	format: "",
};

const DownloadApplicationBulk: FunctionComponent<
	DownloadApplicationBulkProps
> = ({handleClose, onSuccess, onError, isShow}) => {
	const {
		formState: {isValid},
		handleSubmit,
		setValue,
		control,
		watch,
		reset,
	} = useForm({
		values: {
			...initialValue,
		},
		resolver: yupResolver(schema),
		mode: "all",
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const watchStartDate = dayjs(watch("startDate")).toDate();

	const watchEndDate = dayjs(watch("endDate")).toDate();

	const watchFormat = watch("format");

	const downloadFile = useCallback(
		async (url: string, fileName: string) => {
			try {
				const fileResponse = await axios.get(url, {
					responseType: "blob",
				});

				const blob = new Blob([fileResponse.data], {
					type: "application/octet-stream",
				});

				const link = document.createElement("a");
				link.href = window.URL.createObjectURL(blob);
				link.download = fileName;
				link.style.display = "none";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				window.URL.revokeObjectURL(link.href);
			} catch (error) {
				onError("Maaf, terjadi error ketika download file.");
			}
		},
		[onError],
	);

	const singleFileDownloadHandler = useCallback(
		async (links: string[]) => {
			const fileExtension = watchFormat === "xls" ? "xlsx" : watchFormat;

			for (let i = 0; i < links.length; i++) {
				const filename = `application data.${fileExtension}`;
				await downloadFile(links[i], filename);
			}
		},
		[downloadFile, watchFormat],
	);

	const downloadBulk = useCallback(
		async (data: yup.InferType<typeof schema>) => {
			try {
				setIsLoading(true);

				const newStartDate = data.startDate
					? dayjs(data.startDate).format("YYYY-MM-DD")
					: null;

				const newEndDate = data.endDate
					? dayjs(data.endDate).format("YYYY-MM-DD")
					: null;

				const response =
					await axiosInstance.get<SimpedesUmiApplicationDownloadTableResponse>(
						`/api/download/${data.format}`,
						{
							params: {
								startDate: newStartDate,
								endDate: newEndDate,
							},
						},
					);

				if (
					response.data.responseDescription === "SUCCESS" &&
					response.data.data !== null
				) {
					await singleFileDownloadHandler(response.data.data.link);

					if (onSuccess) {
						await onSuccess();
					}
				} else if (
					response.data.responseDescription === "SUCCESS" &&
					response.data.data === null
				) {
					onError("Maaf, tidak ada data pengajuan pada tanggal yang dipilih.");
				}

				handleClose();
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);

				if (axios.isAxiosError(error)) {
					onError(error);
				}
			}
		},
		[handleClose, onError, onSuccess, singleFileDownloadHandler],
	);

	const handleStartDateChange = useCallback(
		(value: string) => {
			setValue("startDate", value, {shouldValidate: true});

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
		downloadBulk(data);
		reset();
	};

	const closeHandler = useCallback(() => {
		reset();
		handleClose();
	}, [handleClose, reset]);

	return (
		<Modal
			id="modal-download-form"
			data-testid="modal-download-form"
			isShow={isShow}
			className="w-[482px]"
			containerClassName="z-20"
			onClickBackground={closeHandler}
		>
			<form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
				<Modal.Header
					id="modal-download-header"
					data-testid="modal-download-header"
					dismissable
					handleClose={closeHandler}
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
								render={({field: {value}}) => (
									<FormGroup>
										<div className="date-range">
											<span className="label-date-range">Dari</span>
											<Flowbite theme={{theme}}>
												<Datepicker
													id="datepicker-startdate"
													data-testid="datepicker-startdate"
													showTodayButton={false}
													showClearButton={false}
													maxDate={new Date()}
													onSelectedDateChanged={(value) =>
														handleStartDateChange(value.toString())
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
								render={({field: {value, onChange}}) => (
									<FormGroup>
										<div className="date-range">
											<span className="label-date-range">Hingga</span>
											<Flowbite theme={{theme}}>
												<Datepicker
													id="datepicker-enddate"
													data-testid="datepicker-enddate"
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
						render={({field: {value, name, ...attrs}}) => (
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
										onClick={(e) => {
											setValue("format", e.currentTarget.value, {
												shouldValidate: true,
											});
										}}
										disabled={isLoading}
										{...attrs}
									/>
									<Radio
										id="radio-xls"
										data-testid="radio-xls"
										label=".xls"
										name="format-option"
										className="w-full"
										value="xls"
										checked={value === "xls"}
										onClick={(e) => {
											setValue("format", e.currentTarget.value, {
												shouldValidate: true,
											});
										}}
										disabled={isLoading}
										{...attrs}
									/>
									<Radio
										id="radio-csv"
										data-testid="radio-csv"
										label=".csv"
										name="format-option"
										className="w-full"
										value="csv"
										checked={value === "csv"}
										onClick={(e) => {
											setValue("format", e.currentTarget.value, {
												shouldValidate: true,
											});
										}}
										disabled={isLoading}
										{...attrs}
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
						disabled={!isValid || isLoading}
					>
						Download
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default DownloadApplicationBulk;
