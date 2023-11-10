import { DownloadTable } from "@/components/tables/DownloadTable";
import {
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";

export default function Download() {
  return (
    <Container as={"section"} maxW={"container.xl"} bg={"#EBEBF0"} py={"3rem"}>
      <Heading
        as="h1"
        color={"#201A18"}
        fontSize={"2xl"}
        fontWeight="bold"
        mb={"1.5rem"}
      >
        Download Laporan
      </Heading>
      <Flex
        bg={"white"}
        borderRadius={"xl"}
        boxShadow={"md"}
        direction={"column"}
        gap={"1.5rem"}
        p={"1rem"}
      >
        <DownloadTable dummyData={dummyData}/>
      </Flex>
    </Container>
  );
}


const dummyData = [
    ["Pengguna Aktif", "Excel"],
    ["Total Komunitas", "Excel"],
    ["Sampah Diterima", "Excel"],
    ["Samoah Dikelola", "Excel"],
    ["Acara Komunitas mendatang", "Excel"],
    ["Artikel Populer", "Excel"],
    ["Rubbish", "Excel"],
    ["Peringkat Pengguna", "Excel"],
    ["Aktivitas Laporan Pengguna", "Excel"],
  ];
