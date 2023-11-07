import {AxiosResponse} from "axios";
import dayjs from "dayjs";
import {Datepicker, Flowbite} from "flowbite-react";
import {
	FunctionComponent,
	HTMLAttributes,
	ReactNode,
	useCallback,
	useEffect,
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
	const [isShowDropdownMenu, setIsShowDropdownMenu] = useState<boolean>(false);
	const [dataPartner, setDataPartner] = useState<PartnerCollectionResponse>();
	const [dataApplicationStatus, setDataApplicationStatus] =
		useState<ApplicationStatusCollectionResponse>();
	const [partner, setPartner] = useState<Record<string, string>>({});
	const [status, setStatus] = useState<Record<string, string>>({});
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [filterParams, setFilterParams] =
		useState<SimpedesUmiApplicationCollectionParams>();

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
		const filterByPartner = Object.values(partner).join(",");
		const filterByStatus = Object.values(status).join(",");

		const filter: SimpedesUmiApplicationCollectionParams = {
			startDate: startDate,
			endDate: endDate,
			partnerName: filterByPartner,
			status: filterByStatus,
			...params,
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
	}, [endDate, onApplyFilter, params, partner, startDate, status]);

	const onClickPartner = useCallback(
		(partnerName: string) => {
			const updatedPartnerName = {...partner};

			if (updatedPartnerName[partnerName] !== undefined) {
				delete updatedPartnerName[partnerName];
			} else {
				updatedPartnerName[partnerName] = partnerName;
			}
			setPartner(updatedPartnerName);
		},
		[partner],
	);

	const onClickStatus = useCallback(
		(filterStatus: string) => {
			const updatedStatus = {...status};

			if (updatedStatus[filterStatus] !== undefined) {
				delete updatedStatus[filterStatus];
			} else {
				updatedStatus[filterStatus] = filterStatus;
			}
			setStatus(updatedStatus);
		},
		[status],
	);

	const handleDateFrom = useCallback((evt: Date) => {
		setStartDate(dayjs(evt).format("YYYY-MM-DD"));
	}, []);

	const handleDateUntil = useCallback((evt: Date) => {
		setEndDate(dayjs(evt).format("YYYY-MM-DD"));
	}, []);

	useEffect(() => {
		fetchDataApplicationStatus();
		fetchDataPartner();
	}, [fetchDataApplicationStatus, fetchDataPartner]);

	const checkedPartner = useCallback(
		(partnerName: string) => {
			const newParams = filterParams;

			if (newParams?.partnerName) {
				const isExist = newParams?.partnerName.includes(partnerName);
				return isExist ? true : undefined;
			}
			return undefined;
		},
		[filterParams],
	);

	useEffect(() => {
		setFilterParams(params);
	}, [params]);

	// useEffect(() => {
	// 	const handleClick = (event: MouseEvent) => {
	// 		if (
	// 			dropdownRef.current &&
	// 			!dropdownRef.current.contains(event.target as Element) &&
	// 			dropdownMenuRef?.current?.classList.contains("active")
	// 		) {
	// 			setIsShowDropdownMenu(false);
	// 		}
	// 	};

	// 	document.addEventListener("click", handleClick);

	// 	return () => {
	// 		document.removeEventListener("click", handleClick);
	// 	};
	// }, []);

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
						<button className="button-apply-filter" onClick={handleApplyFilter}>
							Terapkan
						</button>
					</div>
					<hr className="w-full border border-[#EAEBEB]" />
					<div className="flex flex-col gap-2.5 ">
						<span className="label-filter-by">Tanggal</span>
						<div className="container-date-range">
							<div className="date-range">
								<span className="label-date-range">Dari</span>
								<Flowbite theme={{theme}}>
									<Datepicker
										showTodayButton={false}
										showClearButton={false}
										maxDate={new Date()}
										onSelectedDateChanged={(evt) => {
											handleDateFrom(evt);
										}}
									/>
								</Flowbite>
							</div>
							<div className="date-range">
								<span className="label-date-range">Hingga</span>
								<Flowbite theme={{theme}}>
									<Datepicker
										showTodayButton={false}
										showClearButton={false}
										maxDate={new Date()}
										onSelectedDateChanged={(evt) => {
											handleDateUntil(evt);
										}}
									/>
								</Flowbite>
							</div>
						</div>
						<span className="text-light-80 text-xs font-normal">
							Data yang dapat ditampilkan maksimal adalah 90 hari
						</span>
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
											checked={checkedPartner(el?.name)}
											onClick={() => {
												onClickPartner(el?.name);
											}}
											data-testid="end-user-checkbox"
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
											onClick={() => {
												onClickStatus(item?.name);
											}}
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