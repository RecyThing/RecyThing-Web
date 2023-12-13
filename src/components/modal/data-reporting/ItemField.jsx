import { GridItem, Text } from "@chakra-ui/react";

/**
 * ItemField is a component that is used to display the field for data reporting modal.
 * @param {{label: string, content: string, color: string}} props - The props object.
 * @returns {JSX.Element} The ItemField component.
 */
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
