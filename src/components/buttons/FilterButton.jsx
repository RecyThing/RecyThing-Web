import { Button, Tag } from "@chakra-ui/react";

/**
 * Filter Button
 * @param {{label: string, activeFilter: string, handleFilterClick: function, filteredDataCount: function, isDisabled: string}} props
 * @returns {JSX.Element}
 */
export const FilterButton = ({ label, activeFilter, handleFilterClick, filteredDataCount, isDisabled: isDisabled, ...props }) => {
	return (
		<Button
			key={label}
			colorScheme={label === activeFilter ? "mainGreen" : "gray"}
			bg={label === activeFilter ? "#35CC33" : "#A7A19E0D"}
			fontWeight={"normal"}
			px={"2.5rem"}
			py={"1.75rem"}
			onClick={() => handleFilterClick(label)}
			rightIcon={
				<Tag
					bg={label === activeFilter ? "white" : "#828282"}
					color={label === activeFilter ? "#35CC33" : "white"}
					fontWeight={"semibold"}
					borderRadius={"full"}
					px={"0.75rem"}
				>
					{filteredDataCount(label)}
				</Tag>
			}
			isDisabled={isDisabled === "loading"}
			{...props}
		>
			{label}
		</Button>
	);
};
