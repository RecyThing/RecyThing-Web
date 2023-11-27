import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import DatePicker from "react-datepicker";
import { forwardRef } from "react";
import { DummyInput } from "./DummyInput";
import { formatDateToLocalDate } from "@/utils";

export const InputDate = forwardRef(
	({ label, Logo, className, minDate, maxDate, ...props }, ref) => {
		return (
			<DatePicker
				ref={ref}
				value={props.value ? formatDateToLocalDate(props.value) : null}
				selected={props.value || null}
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
			/>
		);
	}
);

InputDate.displayName = "InputDate";
