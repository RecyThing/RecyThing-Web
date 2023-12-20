/* eslint-disable no-mixed-spaces-and-tabs */
import { MissionStepSection } from "@/components/sections";
import { fetchMissionSelector } from "@/store/mission";
import { formatDateToLocalDate } from "@/utils";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { TicketStar } from "react-iconly";
import { Spinner } from "@/components/spinner";
import { useSelector } from "react-redux";

export function ModalViewDetailMission({ isOpen, onClose }) {
  const { data, status, message } = useSelector(fetchMissionSelector);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
      <ModalContent borderRadius={"3xl"} gap={"1.5rem"} py={"1rem"}>
        {status === "loading" && <Spinner containerSize={"xl"} />}
        {status === "failed" && <div>{message}</div>}
        {status === "success" && (
          <>
            <ModalHeader pb={"0"}>
              <Heading as="h2" fontSize={"2xl"} fontWeight={"bold"}>
                Detail Misi
              </Heading>
            </ModalHeader>

            <ModalBody
              display={"grid"}
              gridTemplateColumns={"0.5fr 1.5fr"}
              gap={6}
              py={"1.5rem"}
              overflowY={"auto"}
              height={"400px"}
            >
              <Flex direction={"column"} gap={2}>
                <Text color={"#828282"}>Gambar Misi</Text>
                <Flex
                  w={"full"}
                  position={"relative"}
                  aspectRatio={"4/3"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={"lg"}
                  flexDirection={"column"}
                >
                  <Image
                    src={data?.mission_image}
                    alt={"mission image"}
                    aspectRatio={"4/3"}
                    objectFit={"cover"}
                    borderRadius={"lg"}
                  />
                </Flex>
              </Flex>

              <Grid
                templateRows={"auto auto auto"}
                templateColumns={"1fr 1fr"}
                gap={4}
              >
                <GridItem colSpan={2}>
                  <Flex justifyContent={"space-between"}>
                    <Text
                      fontSize={22}
                      fontWeight={900}
                      color={"#35CC33"}
                      casing={"capitalize"}
                    >
                      {data?.name}
                    </Text>
                    <Tag bg={"#FBF5D0"}>
                      <TicketStar size={18} />
                      <TagLabel ml={1}>{`${data?.point} point`}</TagLabel>
                    </Tag>
                  </Flex>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text color={"#828282"}>Deskripsi Singkat</Text>
                  <Text fontWeight={500}>{data?.description}</Text>
                </GridItem>
                <GridItem>
                  <Flex flexDirection={"column"}>
                    <Text color={"#828282"}>Dimulai</Text>
                    <Text fontWeight={500}>
                      {formatDateToLocalDate(data?.start_date)}
                    </Text>
                  </Flex>
                </GridItem>
                <GridItem>
                  <Flex flexDirection={"column"}>
                    <Text color={"#828282"}>Berakhir</Text>
                    <Text fontWeight={500}>
                      {formatDateToLocalDate(data?.end_date)}
                    </Text>
                  </Flex>
                </GridItem>
                <GridItem colSpan={"2"}>
                  <MissionStepSection
                    title={data?.title_stage}
                    description={data?.description_stage}
                  />
                </GridItem>
              </Grid>
            </ModalBody>
            <ModalFooter gap={4}>
              <Button
                color={"white"}
                bg={"#828282"}
                borderRadius={"lg"}
                px={"3.5rem"}
                py={"1.75rem"}
                _hover={{ bg: "#333333" }}
                onClick={() => {
                  onClose();
                }}
              >
                Kembali
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
