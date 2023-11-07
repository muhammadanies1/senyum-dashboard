import {Datepicker, DatepickerProps} from "flowbite-react";
import {FunctionComponent} from "react";

type DatePickerProps = DatepickerProps & {};

const DatePicker: FunctionComponent<DatePickerProps> = () => {
	return <Datepicker />;
};

export default DatePicker;
