import { Grid, GridItem, Icon, Text } from "@chakra-ui/react";

/**
 * DetailUserField is a component that is used to display each row of user detail.
 * @param {{icon: JSX.Element, title: string, value: string}} props - The props object.
 * @returns {JSX.Element} The DetailUserField component.
 */
export function DetailUserField({ icon, title, value, ...textProps }) {
	return (
		<Grid
			templateColumns="0.4fr 1fr"
			_hover={{ bg: "#F2F2F2" }}
			gap={"3rem"}
		>
			<GridItem
				display={"flex"}
				gap={"0.5rem"}
				p={"0.5rem"}
			>
				<Icon
					color={"#949494"}
					boxSize={"1.5rem"}
				>
					{icon}
				</Icon>
				<Text
					fontWeight={"medium"}
					color={"#828282"}
					letterSpacing={"tight"}
				>
					{title}
				</Text>
			</GridItem>
			<GridItem p={"0.5rem"}>
				<Text
					fontWeight={"bold"}
					color={"#333333"}
					letterSpacing={"tight"}
					{...textProps}
				>
					{value || "-"}
				</Text>
			</GridItem>
		</Grid>
	);
}
