import { Box, Flex, Text } from "@chakra-ui/react";
import * as Fields from "../../modal/mission-list/MissionFormFields";
import { CustomIconButton } from "@/components/buttons";
import { Trash } from "iconsax-react";

export function InputMissionStepSection({ no, control, errors, remove, data }) {
  return (
    <Box border={"1px"} borderRadius={"lg"} p={3}>
      <Flex gap={2}>
        <Text fontSize={"18px"} fontWeight={500} lineHeight={1.2}>
          {no}
        </Text>
        <Flex width={"100%"} flexDirection={"column"} gap={3}>
          <Fields.MissionTitleStepField
            control={control}
            error={errors.missionSteps?.[no - 1]?.title}
            no={no}
            value={data?.title}
          />
          <Fields.MissionDescriptionStepField
            control={control}
            error={errors.missionSteps?.[no - 1]?.description}
            no={no}
            value={data?.description}
          />
        </Flex>
      </Flex>
      <Flex mt={"10px"} justifyContent={"flex-end"} gap={"8px"}>
        <CustomIconButton
          icon={<Trash />}
          color={"#E53535"}
          hoverColor={"#B22222"}
          onClick={() => remove(no)}
        />
      </Flex>
    </Box>
  );
}
