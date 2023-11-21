import { Button, Tag } from "@chakra-ui/react";

export const TabButton = ({
  label,
  activeFilter,
  handleFilterClick,
  filteredDataCount,
  ...props
}) => {
  return (
    <Button
      key={label}
      colorScheme={label === activeFilter ? "mainGreen" : "gray"}
      bg={label === activeFilter ? "#35CC33" : "#FFFFFF"}
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
      {...props}
    >
      {label}
    </Button>
  );
};
