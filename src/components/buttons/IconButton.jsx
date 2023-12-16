import { IconButton } from "@chakra-ui/react";

/**
 * Custom Icon Button
 * @param {{icon: any, color: string, hoverColor: string, onClick: function, rest: any}} props
 * @returns {JSX.Element}
 */
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
