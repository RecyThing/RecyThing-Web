import { CustomToast } from "@/components/toast";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";

export function useCustomToast(status, message) {
	const toast = useToast();

	return useEffect(() => {
		if (status === "success") {
			toast({
				status: "success",
				position: "top-right",
				duration: 3000,
				isClosable: true,
				render: ({ onClose }) => (
					<CustomToast
						icon={MdCheckCircleOutline}
						message={message}
						onClose={onClose}
						bgColor={"#DCFEDB"}
						color={"#3BA639"}
						hoverColor={"#2C7A7B"}
					/>
				),
			});
		} else if (status === "failed") {
			toast({
				status: "error",
				position: "top-right",
				duration: 3000,
				isClosable: true,
				render: ({ onClose }) => (
					<CustomToast
						icon={MdOutlineCancel}
						message={message}
						onClose={onClose}
						bgColor={"#FFD9D9"}
						color={"#E53535"}
						hoverColor={"#B91C1C"}
					/>
				),
			});
		} else {
			return;
		}
	}, [status, message, toast]);
}
