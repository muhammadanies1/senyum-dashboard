import "./index.css";

import {FunctionComponent, useEffect, useRef} from "react";
import Calendar, {CalendarProps} from "react-calendar";

import Input from "../Input";

type DatePickerProps = CalendarProps & {
	calendarToggle: () => void;
	inputDisabled?: boolean;
	placeholder?: string;
	inputValue?: string;
	isShow: boolean;
};

const DatePicker: FunctionComponent<DatePickerProps> = ({
	calendarToggle,
	inputDisabled,
	placeholder,
	inputValue,
	onChange,
	maxDate,
	minDate,
	isShow,
	value,
}) => {
	const calendarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				calendarRef.current &&
				!calendarRef.current.contains(event.target as Node)
			) {
				calendarToggle();
			}
		};

		if (isShow) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isShow, calendarToggle]);

	return (
		<>
			<div className="datepicker-container" onClick={calendarToggle}>
				<i className="fa-regular fa-calendar"></i>
				<i className="fa-solid fa-chevron-down"></i>
				<Input
					id="datepicker-input"
					data-testid="datepicker-input"
					className="react-calendar__input"
					placeholder={placeholder}
					value={inputValue}
					disabled={inputDisabled}
				/>
			</div>
			{isShow && (
				<div ref={calendarRef}>
					<Calendar
						data-testid="datepicker-calendar"
						nextLabel={<i className="fa-solid fa-chevron-right"></i>}
						prevLabel={<i className="fa-solid fa-chevron-left"></i>}
						next2Label={null}
						prev2Label={null}
						minDate={minDate}
						maxDate={maxDate}
						onChange={(selectedDate, event) => {
							calendarToggle && calendarToggle();
							onChange && onChange(selectedDate, event || undefined);
						}}
						value={value}
						locale="id"
						calendarType="gregory"
						formatShortWeekday={(locale, date) => {
							const d = date.toLocaleString("id-ID", {weekday: "narrow"});
							return d;
						}}
					/>
				</div>
			)}
		</>
	);
};

export default DatePicker;
