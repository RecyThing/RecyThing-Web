/* eslint-disable react/prop-types */
import {
  Avatar,
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
} from "@chakra-ui/react";
import { Calendar2 } from "iconsax-react";
import { useState } from "react";
import {
  Calendar,
  CloseSquare,
  Location,
  Message,
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

export function DetailDaftarTransaksiModal({ isOpen, onClose, data }) {
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
            >156548122</Text>
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
                    <Text
                      fontWeight={"bold"}
                      color={"#333333"}
                      letterSpacing={"tight"}
                    >
                      {dummyData[key]}
                    </Text>
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
            bg={"#828282"}
            borderRadius={"lg"}
            px={"2.5rem"}
            py={"1.75rem"}
            _hover={{ bg: "#333333" }}
            onClick={onClose}
          >
            Kembali
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
