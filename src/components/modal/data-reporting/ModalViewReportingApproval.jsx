/* eslint-disable react/prop-types */
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";

const dummy = {
  reportID: "RBHA509",
  username: "Irene Bauch",
  date: "10:13:24 | 22 Okt 2023",
  lokasiSampah: "Jl. Jenderal Sudirman No. 555",
  lokasiPatokan: "-",
  keterangan: "Ada tumpukan sampah berserakan",
  fotoBukti:
    "https://cdn1-production-images-kly.akamaized.net/tdyD6M-KBikNsqsuhUNpw0mqPq0=/1200x900/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/1653973/original/070015000_1500527322-limbah_plastik.jpg",
  alasanPenolakan: "Foto Bukti Tidak Jelas",
  tipeLaporan: "Pelanggaran Sampah",
  status: "Disetujui",
  jenisSampah: "Sampah Kering",
  jenisPelanggaran: "Skala Kecil",
};

const labels = {
  username: { title: "Username" },
  date: { title: "Waktu Masuk Laporan" },
  lokasiSampah: { title: "Lokasi Sampah" },
  lokasiPatokan: { title: "Lokasi Patokan" },
  keterangan: { title: "Keterangan" },
  fotoBukti: { title: "Foto Bukti" },
  alasanPenolakan: { title: "Alasan Penolakan" },
  reportID: { title: "Report ID" },
  tipeLaporan: { title: "Tipe Laporan" },
  jenisSampah: { title: "Jenis Sampah" },
  jenisPelanggaran: { title: "Jenis Pelanggaran" },
  status: { title: "Status" },
};

export function ModalViewReportingApproval({ isOpen, onClose, data }) {
  // will be changed later
  data = dummy;

  // will be changed later
  // const formatDate = (value) => {
  //   return new Date(value).toLocaleDateString("id-ID", {
  //     id: "numeric",
  //   });
  //    +
  // " | " +
  // new Date(value).toLocaleTimeString("en-GB", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  //   hour12: false,
  // })
  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
      <ModalContent
        p={"1.5rem"}
        gap={"1.5rem"}
        borderRadius={"3xl"}
        shadow={"lg"}
      >
        <ModalHeader p={0}>
          <Flex alignItems={"center"} justifyContent={"flex-start"}>
            <Avatar size={"lg"} src="https://bit.ly/sage-adebayo" />
            <Flex ml={"1.5rem"} flexDirection={"column"}>
              <Text fontWeight={"bold"} fontSize={"20"}>
                {data.username}
              </Text>
              <Box as={"p"} fontSize={"md"}>
                <Text as={"span"} fontWeight={"medium"} color={"#828282"}>
                  {labels.reportID.title} :{" "}
                </Text>
                <Text as={"span"} fontWeight={"bold"} color={"#333333"}>
                  {data.reportID}
                </Text>
              </Box>
            </Flex>
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
          <Flex p={"0.5rem"} gap={"2rem"} width={"full"}>
            <Flex flexDirection={"column"}>
              <Text
                fontWeight={"medium"}
                color={"#828282"}
                letterSpacing={"tight"}
              >
                {labels.tipeLaporan.title}
              </Text>
              <Badge
                px={"9px"}
                py={"5px"}
                rounded={"2xl"}
                fontSize={"xs"}
                fontWeight={"medium"}
                color={"#fff"}
                bg={"#828282"}
              >
                <Text casing={"capitalize"}>{data.tipeLaporan}</Text>
              </Badge>
            </Flex>
            <Flex flexDirection={"column"}>
              <Text
                fontWeight={"medium"}
                color={"#828282"}
                letterSpacing={"tight"}
              >
                {data.tipeLaporan === "Tumpukan Sampah" &&
                  labels.jenisSampah.title}
                {data.tipeLaporan === "Pelanggaran Sampah" &&
                  labels.jenisPelanggaran.title}
              </Text>
              <Badge
                px={"9px"}
                py={"5px"}
                rounded={"2xl"}
                fontSize={"xs"}
                fontWeight={"medium"}
                color={"#fff"}
                bg={"#5B79EF"}
                width={"max-content"}
              >
                <Text casing={"capitalize"} width={"auto"}>
                  {data.tipeLaporan === "Tumpukan Sampah" && data.jenisSampah}
                  {data.tipeLaporan === "Pelanggaran Sampah" &&
                    data.jenisPelanggaran}
                </Text>
              </Badge>
            </Flex>
            <Flex flexDirection={"column"}>
              <Text
                fontWeight={"medium"}
                color={"#828282"}
                letterSpacing={"tight"}
              >
                {labels.status.title}
              </Text>
              <Badge
                px={"8px"}
                py={"4px"}
                fontSize={"xs"}
                fontWeight={"medium"}
                color={"#154C3C"}
                bg={"#C7EBD1"}
              >
                {}
                <Text casing={"capitalize"}>{data.status}</Text>
              </Badge>
            </Flex>
          </Flex>
          {Object.entries(labels).map(([key, value]) => {
            if (
              [
                "date",
                "lokasiSampah",
                "lokasiPatokan",
                "keterangan",
                "fotoBukti",
                "alasanPenolakan",
              ].includes(key)
            ) {
              return (
                <Grid
                  key={key}
                  templateColumns="0.4fr 1fr"
                  _hover={{ bg: "#F2F2F2" }}
                  gap={"3rem"}
                >
                  <GridItem display={"flex"} gap={"0.5rem"} p={"0.5rem"}>
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
                      {key === "fotoBukti" ? (
                        <Flex
                          flexDirection={"row"}
                          flexWrap={"wrap"}
                          gap={"3rem"}
                        >
                          <Image
                            src={data[key]}
                            aspectRatio={1}
                            w={"7rem"}
                            borderRadius={"10px"}
                          />
                        </Flex>
                      ) : (
                        data[key]
                      )}
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
