import { Box, Flex, Text } from "@chakra-ui/react";

export function MissionStepSection({ title, description }) {
  return (
    <Flex flexDirection={"column"} gap={3}>
      <Text color={"#828282"}>Tahapan/Tantangan Misi</Text>
      <Box border={"1px solid #828282"} borderRadius={"lg"} p={3}>
        <Flex flexDirection={"column"} gap={2}>
            <Text casing={"capitalize"} fontSize={"16px"} fontWeight={600}>
              {title}
            </Text>
            <Text fontSize={"14px"} color={"#828282"}>
              {description}
            </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
