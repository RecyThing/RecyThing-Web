import { DownloadTable } from "@/components/tables/DownloadTable";
import { Button, Container, Flex, Heading } from "@chakra-ui/react";

export default function Download() {
  return (
    <Container
      as={"section"}
      maxW={"container.2xl"}
      bg={"#EBEBF0"}
      p={"1.5rem"}
    >
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
        p={"1.5rem"}
      >
        <DownloadTable TableHead={TableHead} data={data} />
        <Button
          width={"fit-content"}
          alignSelf={"flex-end"}
          color={"white"}
          background={"#828282"}
          fontSize={12}
          px={10}
        >
          Kembali
        </Button>
      </Flex>
    </Container>
  );
}
const TableHead = ["No.", "Kategori", "File", "Download"];

const data = [
  ["Pengguna Aktif", "Excel"],
  ["Total Komunitas", "Excel"],
  ["Sampah Diterima", "Excel"],
  ["Sampah Dikelola", "Excel"],
  ["Acara Komunitas mendatang", "Excel"],
  ["Artikel Populer", "Excel"],
  ["Rubbish", "Excel"],
  ["Peringkat Pengguna", "Excel"],
  ["Aktivitas Laporan Pengguna", "Excel"],
];
