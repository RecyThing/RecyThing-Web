/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ArrowDown2 } from "iconsax-react";

import { useState } from "react";
import {
  Calendar,
  CloseSquare,
  Document,
  Location,
  TicketStar,
  TickSquare,
  User,
} from "react-iconly";

const labels = {
  nama: { title: "Nama Pengguna", icon: <User /> },
  tanggal: { title: "Tanggal Transaksi", icon: <Calendar /> },
  waktu: { title: "Waktu Transaksi", icon: <Calendar /> },
  reward: { title: "Nama Reward", icon: <TicketStar /> },
  goal: { title: "Tujuan Pengguna", icon: <TickSquare /> },
  status: { title: "Status", icon: <Location /> },
};

export function EditDetailModal({ isOpen, onClose, target, onUpdate }) {
  const handleUpdate = () => {
    onUpdate(target);
    onClose();
  };

  // will be changed later

  const dummyData = {
    nama: "Rivaldo",
    tanggal: "25 November 2023",
    waktu: "18.30",
    reward: "Voucher Ovo 100000",
    goal: "081361507548",
    status: "Berhasil",
  };

  // will be changed later
  const [status, setStatus] = useState(dummyData.status);

  const formatDate = (value) => {
    return (
      new Date(value).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      " | " +
      new Date(value).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"3xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
      <ModalContent
        p={"1.5rem"}
        gap={"1.5rem"}
        borderRadius={"3xl"}
        shadow={"lg"}
      >
        <ModalHeader p={0}>
          <Flex alignItems={"center"} justifyContent={"flex-start"}>
            <Text
              fontSize={"lg"}
              fontWeight={"semibold"}
              color={"#828282"}
              letterSpacing={"tight"}
            >
              ID Transaksi:
            </Text>
            <Text
              className="ms-2"
              fontSize={"lg"}
              fontWeight={"semibold"}
              color={"#828282"}
              letterSpacing={"tight"}
            >
              156548122
            </Text>
          </Flex>
          <IconButton
            as={ModalCloseButton}
            icon={<CloseSquare size={"large"} />}
            size={"sm"}
            bg={"transparent"}
            color={"#828282"}
            position={"absolute"}
            right={"1.5rem"}
            top={"1.5rem"}
            _hover={{ bg: "transparent", color: "#333333" }}
            _focus={{ boxShadow: "none" }}
          />
        </ModalHeader>

        <ModalBody p={0} display={"flex"} flexDirection={"column"} gap={"1rem"}>
          <Text
            fontSize={"lg"}
            fontWeight={"semibold"}
            color={"#828282"}
            letterSpacing={"tight"}
          >
            Detail Informasi
          </Text>
          {Object.entries(labels).map(([key, value]) => {
            if (
              ["nama", "tanggal", "waktu", "reward", "goal", "status"].includes(
                key
              )
            ) {
              return (
                <Grid
                  key={key}
                  templateColumns="0.4fr 1fr"
                  _hover={{ bg: "#F2F2F2" }}
                  gap={"3rem"}
                >
                  <GridItem display={"flex"} gap={"0.5rem"} p={"0.5rem"}>
                    <Icon color={"#949494"} boxSize={"1.5rem"}>
                      {value.icon}
                    </Icon>
                    <Text
                      fontWeight={"medium"}
                      color={"#828282"}
                      letterSpacing={"tight"}
                    >
                      {value.title}
                    </Text>
                  </GridItem>
                  <GridItem p={"0.5rem"}>
                    {key === "status" ? (
                      <Menu>
                        <MenuButton
                          px={4}
                          py={2}
                          width={"328px"}
                          height={"56px"}
                          transition="all 0.2s"
                          borderRadius="md"
                          borderWidth="1px"
                          _hover={{ bg: "gray.400" }}
                          _focus={{ boxShadow: "outline" }}
                        >
                          <Flex direction={"row"}>
                            <Box>
                              <Document />
                            </Box>
                            <Box className="ms-2" minWidth={"219px"} textAlign={"start"}>{status}</Box>
                            <Box flex={"1"} marginStart={"20px"}>
                              <ArrowDown2 />
                            </Box>
                          </Flex>
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => {
                              setStatus("Terbaru");
                            }}
                          >
                            Terbaru
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setStatus("Diproses");
                            }}
                          >
                            Diproses
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setStatus("Selesai");
                            }}
                          >
                            Selesai
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    ) : (
                      <Text
                        fontWeight={"bold"}
                        color={"#333333"}
                        letterSpacing={"tight"}
                      >
                        {dummyData[key]}
                      </Text>
                    )}
                  </GridItem>
                </Grid>
              );
            }
            return null;
          })}
        </ModalBody>
        <ModalFooter p={0}>
          <Button
            color={"white"}
            bg={"#35CC33"}
            borderRadius={"lg"}
            px={"2.5rem"}
            py={"1.75rem"}
            _hover={{ bg: "#333333" }}
            onClick={handleUpdate}
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
