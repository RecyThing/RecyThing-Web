import { useId } from "react"

export function Input({ className, label, ...props }) {
  const id = useId();
  
  return (
    <div className={`relative ${className}`}>
      <input type="text" id={`floating_outlined_input_${id}`} className="block px-4 py-4 w-full text-sm text-gray-900 bg-transparent rounded-lg
      border border-[#949494] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" {...props} placeholder=" " />

      <label htmlFor={`floating_outlined_input_${id}`} className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 
      scale-75 top-2 z-10 origin-[0] bg-white px-4 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:
      peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
      peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text">{label}</label>
    </div>
  )
}
