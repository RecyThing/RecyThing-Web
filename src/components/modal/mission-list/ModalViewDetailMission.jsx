/* eslint-disable no-mixed-spaces-and-tabs */
import { MissionStepSection } from "@/components/sections";
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

export function ModalViewDetailMission({ isOpen, onClose, data }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
      <ModalContent borderRadius={"3xl"} gap={"1.5rem"} py={"1rem"}>
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
              border={"2px dashed #828282"}
              borderColor={"#828282"}
              borderRadius={"lg"}
              flexDirection={"column"}
            >
              <Image
                src={""}
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
                <Text fontSize={22} fontWeight={900} color={"#35CC33"}>
                  {data?.title}
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
                <Text fontWeight={500}>{data?.start_at}</Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex flexDirection={"column"}>
                <Text color={"#828282"}>Berakhir</Text>
                <Text fontWeight={500}>{data?.end_at}</Text>
              </Flex>
            </GridItem>
            <GridItem colSpan={"2"}>
              <Flex flexDirection={"column"} gap={2}>
                <Text color={"#828282"}>Tahapan/Tantangan Misi</Text>
                {data?.steps.map((step, index) => {
                  return (
                    <MissionStepSection
                      key={index}
                      no={index + 1}
                      title={step?.title}
                      description={step?.description}
                    />
                  );
                })}
              </Flex>
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
      </ModalContent>
    </Modal>
  );
}