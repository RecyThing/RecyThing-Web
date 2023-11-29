import { CloseButton, Flex, Icon, Text } from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";

export function CustomToast({
	message,
	icon,
	onClose,
	color,
	bgColor,
	hoverColor,
	...props
}) {
	return (
		<Flex
			bgColor={bgColor}
			borderRadius={"0.5rem"}
			w={"400px"}
			h={"60px"}
			boxShadow={"md"}
			px={"1.5rem"}
			py={"1.125rem"}
			alignItems={"center"}
			justifyContent={"space-between"}
			gap={"1rem"}
			{...props}
		>
			<Flex
				alignItems={"center"}
				color={color}
				fontSize={"1rem"}
				fontWeight={"semibold"}
				gap={"1rem"}
			>
				<Icon
					as={icon}
					boxSize={"2rem"}
				/>
				<Text casing={"capitalize"}>{message}</Text>
			</Flex>
			<CloseButton
				as={CloseSquare}
				size={"1.5rem"}
				color={color}
				cursor={"pointer"}
				_hover={{
					color: hoverColor,
				}}
				onClick={onClose}
			/>
		</Flex>
	);
}
