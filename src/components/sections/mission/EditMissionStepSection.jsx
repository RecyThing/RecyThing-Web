import { Box, Button, Flex, Text } from "@chakra-ui/react";
import * as Fields from "../../modal/mission-list/MissionFormFields";
import { CustomIconButton } from "@/components/buttons";
import { Edit2, Trash } from "iconsax-react";
import { useState } from "react";

export function EditMissionStepSection({
  no,
  control,
  errors,
  remove,
  data,
  onCreate = false,
}) {
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(onCreate);
  if (create) {
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
              value={data?.title}
            />
            <Fields.MissionDescriptionStepField
              control={control}
              error={errors.missionSteps?.[no-1]?.description}
              no={no}
              value={data?.description}
            />
          </Flex>
        </Flex>
        <Flex mt={"10px"} justifyContent={"flex-end"} gap={"8px"}>
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
            onClick={() => setCreate(false)}
          >
            Tambah
          </Button>
        </Flex>
      </Box>
    );
  } else {
    return edit ? (
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
            />
            <Fields.MissionDescriptionStepField
              control={control}
              error={errors.missionSteps?.[no-1]?.description}
              no={no}
            />
          </Flex>
        </Flex>
        <Flex mt={"10px"} justifyContent={"flex-end"} gap={"8px"}>
          <Button
            color={"white"}
            bg={"#35CC33"}
            borderRadius={"lg"}
            px={"1.25rem"}
            py={"1.25rem"}
            _hover={{ bg: "#2DA22D" }}
            type="submit"
            fontSize={"12px"}
            onClick={() => setEdit(false)}
          >
            Perbarui
          </Button>
        </Flex>
      </Box>
    ) : (
      <Box border={"1px"} borderRadius={"lg"} p={3}>
        <Flex gap={2} justifyContent={"space-between"}>
          <Flex gap={2}>
            <Text fontSize={"18px"} fontWeight={500} lineHeight={1.2}>
              {no}
            </Text>
            <Box>
              <Text fontSize={"14px"} fontWeight={500}>
                {data?.title}
              </Text>
              <Text fontSize={"12px"} color={"#828282"}>
                {data?.description}
              </Text>
            </Box>
          </Flex>

          <Flex alignSelf={"center"}>
            <CustomIconButton
              icon={<Edit2 />}
              color={"#828282"}
              hoverColor={"#333333"}
              onClick={() => setEdit(true)}
            />
            <CustomIconButton
              icon={<Trash />}
              color={"#E53535"}
              hoverColor={"#B22222"}
              onClick={() => remove(no)}
            />
          </Flex>
        </Flex>
      </Box>
    );
  }
}
