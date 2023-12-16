import { Badge, Text } from "@chakra-ui/react";

/**
 * Custom Square Badge
 * @param {{children: string, color: string, bgColor: string, rest: any}} props
 * @returns {JSX.Element}
 */
export function CustomSquareBadge({ children, color, bgColor, ...rest }) {
	return (
		<Badge
			m={"auto"}
			px={"0.5rem"}
			py={"0.25rem"}
			fontSize={"xs"}
			fontWeight={"medium"}
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
