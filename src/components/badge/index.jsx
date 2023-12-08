import { Badge, Text } from "@chakra-ui/react";

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
