/* eslint-disable no-mixed-spaces-and-tabs */
import { CustomRoundBadge, CustomSquareBadge } from "@/components/badge";
import { Spinner } from "@/components/spinner";
import { fetchDataReportSelector } from "@/store/report";
import { formatDateToCustomDate } from "@/utils";
import {
  Avatar,
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
  Spacer,
  Text,
} from "@chakra-ui/react";
import { current } from "@reduxjs/toolkit";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { CloseSquare } from "react-iconly";
import { useSelector } from "react-redux";

const labels = {
  address_point: "Lokasi Patokan",
  created_at: "Waktu Masuk Laporan",
  description: "Keterangan",
  image: "Foto Bukti",
  insident_date: "Waktu Kejadian",
  location: "Lokasi Sampah",
  rejection_description: "Alasan Penolakan",
  report_id: "Report ID",
  report_type: "Tipe Laporan",
  scale_type: "Jenis Pelanggaran",
  status: "Status",
  trash_type: "Jenis Sampah",
  username: "Username",
  company_name: "Informasi Perusahaan",
  dangerous_waste: "Sampah Berbahaya",
};

export function ModalViewImageReporting({
  isOpen,
  onClose,
  companyName,
  currentImage,
  data,
  onChangeImage,
  totalImage,
}) 
{
  const handlePrevImage = ()=>{
    if (currentImage+1 > 1) {
      onChangeImage(currentImage-1)
    }
  };

  const handleNextImage = ()=>{
    if (currentImage < 1) {
      onChangeImage(currentImage+1)
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"6xl"} isCentered>
      <ModalOverlay bg={"#0000000D"} backdropFilter={"blur(5px)"} />
      {/* <Flex flexDirection={"row"} justifyItems={"space-between"}> */}
      <ModalContent p={"1rem"} gap={"1rem"} borderRadius={"3xl"} shadow={"lg"}>
        <ModalHeader p={0}>
          <IconButton
            as={ModalCloseButton}
            icon={<CloseSquare size={"large"} />}
            size={"sm"}
            bg={"transparent"}
            color={"#ffffff"}
            position={"absolute"}
            right={"1.5rem"}
            top={"1.5rem"}
            _hover={{ bg: "transparent", color: "#333333" }}
            _focus={{ boxShadow: "none" }}
          />
        </ModalHeader>

        <ModalBody p={0} display={"flex"} flexDirection={"column"} gap={"1rem"}>
          <Flex flexDirection={"row"} alignItems={"center"} justify={"center"} width={"1120px"} height={"630px"} justifyItems={"space-between"}>
            <IconButton
              icon={<ArrowLeft2 />}
              bg={"#ffffff"}
              marginRight={"50px"}
              isDisabled={currentImage+1 === 1}
              onClick={handlePrevImage}
            />
            <Image
              sizes="4xl"
              minWidth={"1120px"}
              minHeight={"630px"}
              maxWidth={"1120px"}
              maxHeight={"630px"}
              src={data[currentImage].image}
            />
            <IconButton
              icon={<ArrowRight2 />}
              bg={"#ffffff"}
              marginLeft={"50px"}
              isDisabled={currentImage+1 === totalImage}
              onClick={handleNextImage}
            />
          </Flex>
		  <div>
			{companyName ? (
				<>
					<Flex flexDirection={"row"} textAlign={"space-between"}>
						<Text fontSize="sm" color="gray.400">
							Limbah {companyName}
						</Text>
						<Spacer/>
						<Text fontSize="sm" color="gray.400">
							{currentImage+1} dari {totalImage}
						</Text>

					</Flex>
				</>
			):(
        <Text fontSize="sm" color="gray.400" textAlign={"end"} width={"100%"}>
              {currentImage+1} dari {totalImage}
          </Text>
				
			)}

		  </div>
        </ModalBody>
      </ModalContent>

      {/* </Flex> */}
    </Modal>
  );
}
