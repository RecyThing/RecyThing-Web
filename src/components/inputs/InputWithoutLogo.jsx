/* eslint-disable no-mixed-spaces-and-tabs */
import { forwardRef, useId } from "react";

export const InputWithoutLogo = forwardRef(
  ({ className, label, type, value = "", disabled = false, ...props }, ref) => {
    const id = useId();

    return (
      <div className={`relative ${className}`}>
        <input
          ref={ref}
          type={type || "text"}
          value={value}
          id={`floating_outlined${id}`}
          className="block pl-2 pr-2.5 py-4 w-full text-sm text-gray-900 bg-transparent rounded-lg
      	border border-[#949494] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer font-medium"
          placeholder=" "
          disabled={disabled}
          {...props}
        />
        <label
          htmlFor={`floating_outlined${id}`}
          className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 
      scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600
      peer-placeholder-shown:pl-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 
      peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text"
        >
          {label}
        </label>
      </div>
    );
  }
);

InputWithoutLogo.displayName = "InputWithoutLogo";
