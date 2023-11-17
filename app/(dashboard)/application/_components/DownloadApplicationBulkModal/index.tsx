"use client";

import axios from "axios";
import dayjs from "dayjs";
import {Datepicker, Flowbite} from "flowbite-react";
import React, {
	FunctionComponent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/atoms/Button";
import FormGroup from "@/components/atoms/FormGroup";
import Label from "@/components/atoms/Label";
import Radio from "@/components/atoms/Radio";
import Modal from "@/components/molecules/Modal";
import axiosInstance from "@/config/client/axios";
import {theme} from "@/config/theme";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
	format: yup
		.mixed()
		.oneOf(["pdf", "xls", "csv"], "Format file tidak valid.")
		.required("Format file harus diisi."),
	startDate: yup.string().optional(),
	endDate: yup.string().optional(),
});

type DownloadApplicationBulkProps = {
	isShow: boolean;
	handleClose: () => void;
	onSuccess?: () => Promise<void>;
	onError: (error: unknown) => void;
};

const initialValue: yup.InferType<typeof schema> = {
	format: "",
	startDate: "",
	endDate: "",
};

const DownloadApplicationBulk: FunctionComponent<
	DownloadApplicationBulkProps
> = ({handleClose, onSuccess, onError, isShow}) => {
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

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const watchStartDate = dayjs(watch("startDate")).toDate();
	const watchEndDate = dayjs(watch("endDate")).toDate();

	const downloadBulk = useCallback(
		async (data: yup.InferType<typeof schema>) => {
			try {
				setIsLoading(true);

				const fileExtension = data.format === "xls" ? "xlsx" : data.format;

				const newStartDate = data.startDate
					? dayjs(data.startDate).format("YYYY-MM-DD")
					: null;

				const newEndDate = data.endDate
					? dayjs(data.endDate).format("YYYY-MM-DD")
					: null;

				const response = await axiosInstance.get(
					`/api/download/${data.format}`,
					{
						params: {
							startDate: newStartDate,
							endDate: newEndDate,
						},
					},
				);

				const downloadFile = async (url: string, fileName: string) => {
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
						console.error("Error downloading file:", error);
					}
				};

				if (
					response.data.responseDescription === "SUCCESS" &&
					response.data.data !== null
				) {
					response.data.data.link.map((item: string) => {
						downloadFile(item, `application data.${fileExtension}`);
					});

					handleClose();
					setIsLoading(false);
					if (onSuccess) {
						await onSuccess();
					}
				} else if (
					response.data.responseDescription === "SUCCESS" &&
					response.data.data === null
				) {
					handleClose();
					setIsLoading(false);
					onError("Maaf, tidak ada data pengajuan pada tanggal yang dipilih.");
				}
			} catch (error) {
				setIsLoading(false);

				if (axios.isAxiosError(error)) {
					onError(error);
				}
			}
		},
		[handleClose, onError, onSuccess],
	);

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
			downloadBulk(data);
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
								render={({field: {value}, fieldState: {error}}) => (
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
								render={({field: {value, onChange}, fieldState: {error}}) => (
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
