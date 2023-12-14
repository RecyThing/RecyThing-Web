import { formatDateToLocalDate } from "@/utils";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
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
  Box,
  CheckboxIcon,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";
import { useState } from "react";
import { CopyIcon } from "@/components/icons";
// import { ModalEditCommunity } from "./ModalEditCommunity";

export function ModalViewDetailEvent({ isOpen, onClose, onOpenUpdate, data }) {
  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();

  const handleUpdate = () => {
    onOpenUpdate();
    onClose();
  };

  const [copiedGMaps, setCopiedGMaps] = useState(false);
  const [copiedGForms, setCopiedGForms] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditModal = (row) => {
    setSelectedRow(row);
    onOpenView();
  };

  const handleCopyGMaps = () => {
    navigator.clipboard.writeText(data?.gMaps);
    setCopiedGMaps(true);
    setTimeout(() => setCopiedGMaps(false), 200);
  };

  const handleCopyGForms = () => {
    navigator.clipboard.writeText(data?.gForms);
    setCopiedGForms(true);
    setTimeout(() => setCopiedGForms(false), 200);
  };

  return (
    <>
      {/* <ModalEditCommunity
        isOpen={isOpenView}
        onClose={onCloseView}
        data={selectedRow}
      /> */}

      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"} isCentered>
        <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />

        <ModalContent
          bg={"#FFFFFF"}
          borderRadius={"10px"}
          p={"1.5rem"}
          gap={"1.5rem"}
        >
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
          <ModalHeader p={0}>
            <Heading
              as="h3"
              fontSize={"2xl"}
              fontWeight={"medium"}
              letterSpacing={"tight"}
              color={"#000000"}
            >
              Detail Komunitas
            </Heading>
          </ModalHeader>
          <ModalBody
            display={"grid"}
            gridTemplateColumns={"0.5fr 1.5fr"}
            gap={6}
            p={0}
          >
            <Flex
              position={"relative"}
              aspectRatio={"4/3"}
              borderRadius={"lg"}
              flexDirection={"column"}
              gap={"1rem"}
            >
              <Text color={"#828282"} fontSize={"lg"}>
                Gambar Event
              </Text>
              <Image
                src={data?.image}
                alt="community image"
                aspectRatio={"4/3"}
                objectFit={"cover"}
                borderRadius={"lg"}
              />
            </Flex>

            <Grid
              templateRows={"auto auto auto"}
              templateColumns={"1fr 1fr 1fr"}
              gap={6}
            >
              <GridItem colSpan={"3"}>
                <Flex flexDirection={"column"} gap={"0.5rem"}>
                  <Text color={"#828282"} fontSize={"lg"}>
                    Nama Event
                  </Text>
                  <Heading
                    color={"#3BA639"}
                    fontSize={"4xl"}
                    fontWeight={"bold"}
                  >
                    {data?.name}
                  </Heading>
                </Flex>
              </GridItem>
              <GridItem
                as={Flex}
                colSpan={"3"}
                flexDirection={"column"}
                gap={"0.5rem"}
              >
                <Text color={"#828282"} fontSize={"lg"}>
                  Deskripsi Event
                </Text>
                <Text color={"#333333"} fontSize={"sm"} textAlign={"justify"}>
                  {data?.descriptions}
                </Text>
              </GridItem>

              <GridItem
                as={Flex}
                colSpan={"3"}
                flexDirection={"column"}
                gap={"0.5rem"}
              >
                <Text color={"#828282"} fontSize={"lg"}>
                  Lokasi
                </Text>
                <Text color={"#333333"} fontSize={"sm"} textAlign={"justify"}>
                  {data?.location}
                </Text>
              </GridItem>

              <GridItem
                position="relative"
                colSpan={3}
                flexDirection="column"
                gap="0.5rem"
              >
                <Box position="absolute" top="0" right="0">
                  {copiedGMaps ? (
                    <CheckboxIcon color="green.500" />
                  ) : (
                    <IconButton
                      size="sm"
                      aria-label="Salin Google Maps"
                      onClick={handleCopyGMaps}
                      icon={<CopyIcon />}
                    />
                  )}
                </Box>
                <Text color="#828282" fontSize="lg">
                  Link Google Maps Lokasi Event
                </Text>
                <Flex>
                  <Text color="#333333" fontSize="sm" textAlign="justify">
                    {data?.gMaps}
                  </Text>
                </Flex>
              </GridItem>

              {/* Google Form */}
              <GridItem
                position="relative"
                colSpan={3}
                flexDirection="column"
                gap="0.5rem"
              >
                <Box position="absolute" top="0" right="0">
                  {copiedGForms ? (
                    <CheckboxIcon color="green.500" />
                  ) : (
                    // <CheckCircleIcon color="green.500" />
                    <IconButton
                      size="sm"
                      aria-label="Salin Google Form"
                      onClick={handleCopyGForms}
                      icon={<CopyIcon />}
                    />
                  )}
                </Box>
                <Text color="#828282" fontSize="lg">
                  Link Google Form Pendaftaran Event
                </Text>
                <Flex>
                  <Text color="#333333" fontSize="sm" textAlign="justify">
                    {data?.gForms}
                  </Text>
                </Flex>
              </GridItem>

              <GridItem as={Flex} flexDirection={"column"} gap={"0.5rem"}>
                <Text color={"#828282"} fontSize={"lg"}>
                  Total Kuota
                </Text>
                <Text color={"#333333"} fontSize={"lg"}>
                  {data?.kuota}
                </Text>
              </GridItem>

              <GridItem as={Flex} flexDirection={"column"} gap={"0.5rem"}>
                <Text color={"#828282"} fontSize={"lg"}>
                  Tanggal Pelaksanaan
                </Text>
                <Text color={"#333333"} fontSize={"lg"}>
                  {formatDateToLocalDate(data?.tanggal)}
                </Text>
              </GridItem>

              <GridItem as={Flex} flexDirection={"column"} gap={"0.5rem"}>
                <Text color={"#828282"} fontSize={"lg"}>
                  Status Event
                </Text>
                <Text
                  color={
                    data?.status === "Berjalan"
                      ? "#D4AF35"
                      : data?.status === "Belum Berjalan"
                      ? "blue"
                      : data?.status === "Selesai"
                      ? "green"
                      : "#000000"
                  }
                  fontSize={"lg"}
                >
                  {data?.status}
                </Text>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter
            display={"flex"}
            gap={"1rem"}
            justifyContent={"flex-end"}
            p={0}
          >
            <Button
              color={"white"}
              bg={"#828282"}
              borderRadius={"lg"}
              px={"3.25rem"}
              py={"1.75rem"}
              _hover={{ bg: "#333333" }}
              onClick={onClose}
            >
              Batal
            </Button>
            <Button
              color={"white"}
              bg={"#35CC33"}
              borderRadius={"lg"}
              px={"3rem"}
              py={"1.75rem"}
              _hover={{ bg: "#2DA22D" }}
              onClick={handleUpdate}
            >
              Perbarui
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
