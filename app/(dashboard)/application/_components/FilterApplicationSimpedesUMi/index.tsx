import {AxiosResponse} from "axios";
import dayjs from "dayjs";
import {Datepicker, Flowbite} from "flowbite-react";
import {
	FunctionComponent,
	HTMLAttributes,
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import Checkbox from "@/components/atoms/Checkbox";
import axiosInstance from "@/config/client/axios";
import {theme} from "@/config/theme";
import {ApplicationStatusCollectionResponse} from "@/types/ApplicationStatusCollectionResponse";
import {PartnerCollectionResponse} from "@/types/PartnerCollectionResponse";
import {SimpedesUmiApplicationCollectionParams} from "@/types/SimpedesUmiApplicationCollectionParams";

type DropdownProps = HTMLAttributes<HTMLDivElement> & {
	label?: string | ReactNode;
	togglerClassName?: string;
	contents?: ReactNode;
	params: SimpedesUmiApplicationCollectionParams;
	onApplyFilter: (arg: SimpedesUmiApplicationCollectionParams) => void;
};

const FilterApplicationSimpedesUMi: FunctionComponent<DropdownProps> = ({
	label,
	children,
	className,
	togglerClassName,
	contents,
	params,
	onApplyFilter,
	...attrs
}) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	const dropdownMenuRef = useRef<HTMLDivElement>(null);

	const calendar1Ref = useRef<HTMLDivElement>(null);

	const calendar2Ref = useRef<HTMLDivElement>(null);

	const [isShowDropdownMenu, setIsShowDropdownMenu] = useState<boolean>(false);

	const [dataPartner, setDataPartner] = useState<PartnerCollectionResponse>();

	const [dataApplicationStatus, setDataApplicationStatus] =
		useState<ApplicationStatusCollectionResponse>();

	const [partnerList, setPartnerList] = useState<string[]>([]);

	const [statusList, setStatusList] = useState<string[]>([]);

	const [startDate, setStartDate] = useState<Date>();

	const [endDate, setEndDate] = useState<Date>();

	const toggleDropdownMenu = useCallback(() => {
		setIsShowDropdownMenu((state) => !state);
	}, []);

	const fetchDataPartner = useCallback(async () => {
		try {
			const res: AxiosResponse<PartnerCollectionResponse> =
				await axiosInstance.get("/api/partner");
			setDataPartner(res?.data);
		} catch (error) {
			setDataPartner(undefined);
		}
	}, []);

	const fetchDataApplicationStatus = useCallback(async () => {
		try {
			const res: AxiosResponse<ApplicationStatusCollectionResponse> =
				await axiosInstance.get("/api/application-status");
			setDataApplicationStatus(res?.data);
		} catch (error) {
			setDataApplicationStatus(undefined);
		}
	}, []);

	const handleApplyFilter = useCallback(() => {
		const filterByPartner = partnerList.join(",");
		const filterByStatus = statusList.join(",");

		const filter: SimpedesUmiApplicationCollectionParams = {
			...params,
			startDate: startDate ? dayjs(startDate).format("YYYY-MM-DD") : undefined,
			endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : undefined,
			partnerName: filterByPartner,
			status: filterByStatus,
		};

		if (filter.startDate === "" || filter.startDate === null) {
			delete filter.startDate;
		}
		if (filter.endDate === "" || filter.endDate === null) {
			delete filter.endDate;
		}
		if (filter.partnerName === "" || filter.partnerName === null) {
			delete filter.partnerName;
		}
		if (filter.status === "" || filter.status === null) {
			delete filter.status;
		}
		onApplyFilter(filter);
		setIsShowDropdownMenu(false);
	}, [endDate, onApplyFilter, params, partnerList, startDate, statusList]);

	const onClickPartner = useCallback(
		(partnerName: string) => {
			let newPartnerList = [...partnerList];

			const isExist = newPartnerList.includes(partnerName);

			if (isExist) {
				newPartnerList = newPartnerList.filter((item) => item !== partnerName);
			} else {
				newPartnerList.push(partnerName);
			}

			setPartnerList(newPartnerList);
		},
		[partnerList],
	);

	const onClickStatus = useCallback(
		(filterStatus: string) => {
			let newStatusList = [...statusList];

			const isExist = newStatusList.includes(filterStatus);

			if (isExist) {
				newStatusList = newStatusList.filter((item) => item !== filterStatus);
			} else {
				newStatusList.push(filterStatus);
			}
			setStatusList(newStatusList);
		},
		[statusList],
	);

	const handleDateFrom = useCallback((date: Date) => {
		setStartDate(date);
	}, []);

	const handleDateUntil = useCallback((date: Date) => {
		setEndDate(date);
	}, []);

	useEffect(() => {
		fetchDataApplicationStatus();
		fetchDataPartner();
	}, [fetchDataApplicationStatus, fetchDataPartner]);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const isDropdownElementClicked =
				dropdownRef.current &&
				dropdownRef.current.contains(event.target as Element);

			const isDropdownMenuActive =
				dropdownMenuRef?.current?.classList.contains("active");

			const isCalendarItem = (event.target as Element).classList.contains(
				"datepicker-item",
			);

			if (
				!isDropdownElementClicked &&
				isDropdownMenuActive &&
				!isCalendarItem
			) {
				setIsShowDropdownMenu(false);
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	useEffect(() => {
		if (!params.status) {
			setStatusList([]);
			return;
		}

		setStatusList(params.status?.split(","));
	}, [params.status]);

	useEffect(() => {
		if (!params.partnerName) {
			setPartnerList([]);
			return;
		}

		setPartnerList(params.partnerName?.split(","));
	}, [params, params.partnerName]);

	useEffect(() => {
		if (!params.status) {
			setStatusList([]);
			return;
		}

		setStatusList(params.status?.split(","));
	}, [params.status]);

	useEffect(() => {
		if (!params.partnerName) {
			setPartnerList([]);
			return;
		}

		setPartnerList(params.partnerName?.split(","));
	}, [params, params.partnerName]);

	useEffect(() => {
		if (!params?.startDate) {
			setStartDate(undefined);
			return;
		}
		setStartDate(new Date(params?.startDate));
	}, [params?.startDate]);

	useEffect(() => {
		if (!params?.endDate) {
			setEndDate(undefined);
			return;
		}
		setEndDate(new Date(params?.endDate));
	}, [params?.endDate]);

	const validateDateRange = useMemo(() => {
		if (startDate && endDate) {
			const startDateObj = new Date(startDate);
			const endDateObj = new Date(endDate);

			const differenceInDays = Math.floor(
				(endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24),
			);

			if (differenceInDays > 90) {
				return false;
			} else {
				return true;
			}
		}
		return true;
	}, [endDate, startDate]);

	const checkDate = useMemo(() => {
		if (startDate && endDate) {
			const isValidDateRange: boolean = startDate <= endDate ? true : false;
			return isValidDateRange;
		}
	}, [endDate, startDate]);

	const validateDate = useMemo(() => {
		if (startDate && endDate && validateDateRange && checkDate) {
			return true;
		}
	}, [checkDate, endDate, startDate, validateDateRange]);

	return (
		<div
			className={"dropdown".concat(className ? ` ${className}` : "")}
			{...attrs}
			ref={dropdownRef}
		>
			<button
				className={"dropdown-toggler-filter-application"
					.concat(isShowDropdownMenu ? " active" : "")
					.concat(togglerClassName ? ` ${togglerClassName}` : "")}
				onClick={toggleDropdownMenu}
			>
				{label}
			</button>
			<div
				className={"dropdown-content-filter-application".concat(
					isShowDropdownMenu ? " active" : "",
				)}
				ref={dropdownMenuRef}
			>
				<div className="container-filter-simpedes-umi">
					<div className="flex justify-between">
						<span className="label-filter"> Filter </span>
						<button
							className={"button-apply-filter".concat(
								validateDate
									? " text-primary-80 cursor-pointer"
									: !startDate && !endDate
									? " text-primary-80 cursor-pointer"
									: " text-gray-500 cursor-not-allowed",
							)}
							onClick={
								validateDate
									? handleApplyFilter
									: !startDate && !endDate
									? handleApplyFilter
									: undefined
							}
						>
							Terapkan
						</button>
					</div>
					<hr className="w-full border border-[#EAEBEB]" />
					<div className="flex flex-col gap-2.5 ">
						<span className="label-filter-by">Tanggal</span>
						<div className="container-date-range">
							<div className="date-range" ref={calendar1Ref}>
								<span className="label-date-range">Dari</span>
								<Flowbite theme={{theme}}>
									<Datepicker
										showTodayButton={false}
										showClearButton={false}
										maxDate={new Date()}
										value={
											startDate ? dayjs(startDate).format("DD/MM/YYYY") : ""
										}
										type="text"
										placeholder="Pilih Tanggal"
										onSelectedDateChanged={handleDateFrom}
									/>
								</Flowbite>
							</div>
							<div className="date-range" ref={calendar2Ref}>
								<span className="label-date-range">Hingga</span>
								<Flowbite theme={{theme}}>
									<Datepicker
										showTodayButton={false}
										showClearButton={false}
										maxDate={new Date()}
										value={endDate ? dayjs(endDate).format("DD/MM/YYYY") : ""}
										type="text"
										placeholder="Pilih Tanggal"
										onSelectedDateChanged={handleDateUntil}
										disabled={!startDate ? true : false}
									/>
								</Flowbite>
							</div>
						</div>
						{validateDateRange ? (
							false
						) : (
							<span className="text-light-80 text-xs font-normal">
								Data yang dapat ditampilkan maksimal adalah 90 hari
							</span>
						)}
					</div>
					<hr className="w-full border border-[#EAEBEB]" />
					<div className="flex flex-col gap-2">
						<span className="label-filter-by"> Partner </span>
						<div className="grid grid-cols-2 gap-2">
							{dataPartner !== undefined &&
							dataPartner?.data?.data?.length !== 0
								? dataPartner?.data?.data.map((el, idx) => (
										<Checkbox
											key={idx}
											label={el?.name}
											value={el?.name}
											onChange={() => {
												onClickPartner(el?.name);
											}}
											data-testid="end-user-checkbox"
											checked={partnerList.includes(el.name)}
										/>
								  ))
								: null}
						</div>
					</div>
					<hr className="w-full border border-[#EAEBEB]" />
					<div className="flex flex-col gap-2">
						<span className="label-filter-by"> Status </span>
						<div className="grid grid-rows-1 gap-2">
							{dataApplicationStatus !== undefined &&
							dataApplicationStatus?.data?.length !== 0
								? dataApplicationStatus?.data?.map((item, index) => (
										<Checkbox
											key={index}
											label={item?.name}
											value={item?.name}
											data-testid="end-user-checkbox"
											onChange={() => {
												onClickStatus(item?.name);
											}}
											checked={statusList.includes(item.name)}
										/>
								  ))
								: null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

FilterApplicationSimpedesUMi.displayName = "FilterApplicationSimpedesUMi";

export default FilterApplicationSimpedesUMi;
