import { forwardRef, useId } from "react";

/**
 * Base Input With Logo Field
 */
export const InputWithLogo = forwardRef(
	/**
	 * @param {{className: string, label: string, type: string, Logo: any, value: string, props: any}} props
	 * @param {React.Ref<any>} ref
	 */
	({ className, label, type, Logo, value = "", ...props }, ref) => {
		const id = useId();

		return (
			<div className={`relative ${className}`}>
				<input
					ref={ref}
					type={type || "text"}
					value={value}
					id={`floating_outlined${id}`}
					className={`block pl-12 pr-2.5 py-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border ${
						props.error ? "border-red-600" : props.disabled || "border-[#949494]"
					} appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
					placeholder=" "
					autoComplete="off"
					onKeyDown={(e) => {
						if (type === "number") {
							const keysToPrevent = ["e", "E", "-", "+", ".", " ", ","];
							if (keysToPrevent.includes(e.key)) {
								e.preventDefault();
							}
						}
					}}
					{...props}
				/>

				<Logo
					size={24}
					className="absolute left-4 top-4 z-20"
					primaryColor="#949494"
				/>
				<label
					htmlFor={`floating_outlined${id}`}
					className={`absolute text-sm ${
						props.error ? "text-red-600" : "text-gray-500"
					} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:pl-12 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text`}
				>
					{label}
				</label>
			</div>
		);
	}
);

InputWithLogo.displayName = "InputWithLogo";
