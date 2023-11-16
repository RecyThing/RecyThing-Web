import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import DatePicker from "react-datepicker";
import { forwardRef } from "react";
import { DummyInput } from "./DummyInput";

export const InputDate = forwardRef(
	({ label, Logo, className, minDate, maxDate, ...props }, ref) => {
		return (
			<DatePicker
				ref={ref}
				value={props.value?.toLocaleDateString() || null}
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
				dateFormat={"yyyy-MM-dd"}
				minDate={minDate}
				maxDate={maxDate}
				popperPlacement="top"
				isClearable
			/>
		);
	}
);

InputDate.displayName = "InputDate";
