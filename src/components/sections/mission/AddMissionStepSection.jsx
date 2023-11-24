import { Box, Button, Flex, Text } from "@chakra-ui/react";
import * as Fields from "../../modal/mission-list/MissionFormFields";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Trash } from "iconsax-react";
import { useState } from "react";

export function AddMissionStepSection({ no, control, errors, remove, data }) {
  const [save, setSave] = useState(false);

  return (
    <Box border={"1px"} borderRadius={"lg"} p={3}>
      <Flex gap={2}>
        <Text fontSize={"18px"} fontWeight={500} lineHeight={1.2}>
          {no}
        </Text>
        <Flex width={"100%"} flexDirection={"column"} gap={3}>
          <Fields.MissionTitleStepField
            control={control}
            error={errors.missionSteps?.[no-1]?.title}
            no={no}
            disabled={save}
            value={data?.title}
          />
          <Fields.MissionDescriptionStepField
            control={control}
            error={errors.missionSteps?.[no-1]?.description}
            no={no}
            disabled={save}
            value={data?.description}
          />
        </Flex>
      </Flex>
      <Flex mt={"10px"} justifyContent={"flex-end"} gap={"8px"}>
        {save ? (
          <>
            <CustomIconButton
              icon={<Edit2 />}
              color={"#828282"}
              hoverColor={"#333333"}
              onClick={() => setSave(false)}
            />
            <CustomIconButton
              icon={<Trash />}
              color={"#E53535"}
              hoverColor={"#B22222"}
              onClick={() => remove(no)}
            />
          </>
        ) : (
          <>
            <Button
              color={"white"}
              bg={"#828282"}
              borderRadius={"lg"}
              px={"1.25rem"}
              py={"1.25rem"}
              fontSize={"12px"}
              _hover={{ bg: "#333333" }}
              onClick={() => {
                remove(no);
              }}
            >
              Batal
            </Button>
            <Button
              color={"white"}
              bg={"#35CC33"}
              borderRadius={"lg"}
              px={"1.25rem"}
              py={"1.25rem"}
              _hover={{ bg: "#2DA22D" }}
              type="submit"
              fontSize={"12px"}
              onClick={() => setSave(true)}
            >
              Tambah
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
}
