import { forwardRef, useId, useRef } from "react";

export const DummyInput = forwardRef(({ className, label, Logo, ...props }, ref) => {
	const id = useId();
	const inputRef = useRef();

	const handleClick = () => {
		inputRef.current.focus();
	};

	return (
		<div className={`relative ${className}`}>
			<input
				ref={(el) => {
					ref(el);
					if (el) {
						inputRef.current = el;
					}
				}}
				type="text"
				id={`floating_outlined${id}`}
				className={`block pl-12 pr-2.5 py-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border ${
					props.error ? "border-red-600" : "border-[#949494]"
				} appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer caret-transparent`}
				placeholder=" "
				autoComplete="off"
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
				}  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:pl-12 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-pointer`}
				onClick={handleClick}
			>
				{label}
			</label>
		</div>
	);
});

DummyInput.displayName = "InputWithLogo";
