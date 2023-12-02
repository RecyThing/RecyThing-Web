import { Box, Flex, Text } from "@chakra-ui/react";

export function MissionStepSection({no, title, description }) {
  return (
    <Box border={"1px"} borderRadius={"lg"} p={3}>
      <Flex gap={2}>
        <Text fontSize={"18px"} fontWeight={500} lineHeight={1.2}>
          {no}
        </Text>
        <Box>
          <Text fontSize={"14px"} fontWeight={500}>
            {title}
          </Text>
          <Text fontSize={"12px"} color={"#828282"}>
            {description}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
