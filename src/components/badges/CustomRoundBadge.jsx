import { Badge, Text } from "@chakra-ui/react";

/**
 * Custom Round Badge
 * @param {{children: string, color: string, bgColor: string, rest: any}} props
 * @returns {JSX.Element}
 */
export function CustomRoundBadge({ children, color, bgColor, ...rest }) {
	return (
		<Badge
			px={"1rem"}
			py={"0.25rem"}
			fontSize={"sm"}
			fontWeight={"medium"}
			rounded={"full"}
			bg={bgColor}
			width={"max-content"}
			{...rest}
		>
			<Text
				casing={"capitalize"}
				textAlign={"center"}
				color={color}
			>
				{children}
			</Text>
		</Badge>
	);
}
