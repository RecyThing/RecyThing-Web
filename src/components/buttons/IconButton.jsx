/* eslint-disable react/prop-types */
import { IconButton } from "@chakra-ui/react";

export function CustomIconButton({ icon, color, hoverColor, onClick }) {
	return (
		<IconButton
			icon={icon}
			size={"sm"}
			bg={"transparent"}
			color={color}
			_hover={{ bg: "transparent", color: hoverColor }}
			_focus={{ boxShadow: "none" }}
			onClick={onClick}
		/>
	);
}
