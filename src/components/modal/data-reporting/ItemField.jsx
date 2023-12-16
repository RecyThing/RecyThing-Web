import { GridItem, Text } from "@chakra-ui/react";

export function ItemField({ label, content, color = "#333333", ...textProps }) {
	return (
		<>
			<GridItem>
				<Text
					fontWeight={"medium"}
					color={color}
					letterSpacing={"tight"}
				>
					{label}
				</Text>
			</GridItem>

			<GridItem>
				<Text
					fontWeight={"bold"}
					color={color}
					letterSpacing={"tight"}
					{...textProps}
				>
					{content}
				</Text>
			</GridItem>
		</>
	);
}
