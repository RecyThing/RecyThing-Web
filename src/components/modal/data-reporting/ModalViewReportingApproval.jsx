/* eslint-disable react/prop-types */
import { fetchDataReportSelector } from "@/store/report";
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
  Spinner,
  Text,
} from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";
import { useSelector } from "react-redux";


const labels = {
  username: { title: "Username" },
  report_date: { title: "Waktu Masuk Laporan" },
  location: { title: "Lokasi Sampah" },
  address_point: { title: "Lokasi Patokan" },
  insident_date: { title: "Waktu Kejadian" },
  description: { title: "Keterangan" },
  image: { title: "Foto Bukti" },
  alasanPenolakan: { title: "Alasan Penolakan" },
  reportID: { title: "Report ID" },
  tipeLaporan: { title: "Tipe Laporan" },
  jenisSampah: { title: "Jenis Sampah" },
  jenisPelanggaran: { title: "Jenis Pelanggaran" },
  status: { title: "Status" },
};

export function ModalViewReportingApproval({ isOpen, onClose }) {
  const { data, status, message } = useSelector(fetchDataReportSelector);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
      <ModalContent
        p={"1.5rem"}
        gap={"1.5rem"}
        borderRadius={"3xl"}
        shadow={"lg"}
      >
        {status === "loading" && <Spinner containerSize={"lg"} />}
				{status === "failed" && <p>{message}</p>}
				{status === "success" && (
          <>
            <ModalHeader p={0}>
              <Flex alignItems={"center"} justifyContent={"flex-start"}>
                <Avatar size={"lg"} src="https://bit.ly/sage-adebayo" />
                <Flex ml={"1.5rem"} flexDirection={"column"}>
                  <Text fontWeight={"bold"} fontSize={"20"}>
                    {data.fullname}
                  </Text>
                  <Box as={"p"} fontSize={"md"}>
                    <Text as={"span"} fontWeight={"medium"} color={"#828282"}>
                      {labels.reportID.title} :{" "}
                    </Text>
                    <Text as={"span"} fontWeight={"bold"} color={"#333333"}>
                      {data.Id}
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
                    <Text casing={"capitalize"}>{data.report_type}</Text>
                  </Badge>
                </Flex>
                <Flex flexDirection={"column"}>
                  <Text
                    fontWeight={"medium"}
                    color={"#828282"}
                    letterSpacing={"tight"}
                  >
                    {data.report_type === "tumpukan sampah" &&
                      labels.jenisSampah.title}
                    {data.report_type === "pelanggaran sampah" &&
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
                      {data.report_type === "tumpukan sampah" && data.trash_type}
                      {data.report_type === "pelanggaran sampah" &&
                        data.scale_type}
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
                    "report_date",
                    "location",
                    "address_point",
                    "insident_date",
                    "description",
                    "image",
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
                        {data.report_type === "pelanggaran sampah" && key === "insident_date"? (
                          <Text
                            fontWeight={"medium"}
                            color={"#828282"}
                            letterSpacing={"tight"}
                            >
                            {value.title}
                            
                          </Text>
                          ) : data.report_type !== "pelanggaran sampah" && key === "insident_date"? (false
                          ) : data.status === "ditolak" && key === "alasanPenolakan"? (
                            <Text
                            fontWeight={"medium"}
                            color={"#828282"}
                            letterSpacing={"tight"}
                            >
                            {value.title}
                            </Text>
                          ) : data.report_type !== "ditolak" && key === "alasanPenolakan"? (false
                          ) : (
                            <Text
                              fontWeight={"medium"}
                              color={"#828282"}
                              letterSpacing={"tight"}
                              >
                              {value.title}
                              
                            </Text>
                            
                          )}
                      </GridItem>
                      <GridItem p={"0.5rem"}>
                        <Text
                          fontWeight={"bold"}
                          color={"#333333"}
                          letterSpacing={"tight"}
                        >
                          {key === "image" ? (
                            <Flex
                              flexDirection={"row"}
                              flexWrap={"wrap"}
                              gap={"3rem"}
                            >
                              {data.images  ? (
                                data.images.map((dataImage) => (
                                  <Image
                                    src={dataImage.image}
                                    aspectRatio={1}
                                    w={"7rem"}
                                    borderRadius={"10px"}
                                  />
                                ))
                                ):(
                                  <Image
                                    src={data[key]}
                                    aspectRatio={1}
                                    w={"7rem"}
                                    borderRadius={"10px"}
                                  />
                                  
                              )}
                            </Flex>
                          ) : 
                          // Showing Waktu Masuk Laporan Value
                            key === "report_date" ? (`${data.insident_time} | ${data.insident_date}`
                          ) : 
                          // Showing Waktu Kejadian Value
                          data.report_type === "pelanggaran" && key === "insident_date" ? (`${"23.10"} | ${"23-12-23"}`
                          ) : 
                          // Showing Waktu alasan penolakan Value
                          data.status === "ditolak" && key === "alasanPenolakan" ? (data.rejection_description
                          ) : (data[key])}
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
