import { DummyInput } from "./DummyInput";
import { formatDateToLocalDate } from "@/utils";
import { forwardRef } from "react";
import { parseISO, startOfDay } from "date-fns";
import DatePicker from "react-datepicker";
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Date Input Field
 */
export const InputDate = forwardRef(({ label, Logo, className, minDate = startOfDay(new Date()), maxDate, dateFormat = "yyyy-MM-dd", ...props }, ref) => {
	return (
		<DatePicker
			ref={ref}
			value={props.value ? formatDateToLocalDate(props.value) : null}
			selected={typeof props.value === "string" ? parseISO(props.value) : props.value}
			onChange={props.onChange}
			enableTabLoop={false}
			placeholderText=" "
			customInput={
				<DummyInput
					label={label}
					Logo={Logo}
					className={className}
					{...props}
				/>
			}
			onKeyDown={(e) => e.preventDefault()}
			minDate={minDate}
			maxDate={maxDate}
			popperPlacement="top"
			isClearable
			dateFormat={dateFormat}
		/>
	);
});

InputDate.displayName = "InputDate";
