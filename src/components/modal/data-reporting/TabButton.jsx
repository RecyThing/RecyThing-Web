import { Tab } from "@chakra-ui/react";

export function TabButton({ tab }) {
  return (
    <Tab
      px={"0.5rem"}
      fontSize={"2xl"}
      color={"#C7C9D9"}
      _selected={{
        color: "#3BA639",
      }}
      _hover={{
        color: "#3BA639",
      }}
    >
      {tab}
    </Tab>
  );
}
