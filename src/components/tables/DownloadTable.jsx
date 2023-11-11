/* eslint-disable react/prop-types */
import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Download } from "react-iconly";

const TableHead = ["No.", "Kategori", "File", "Download"];

export function DownloadTable({ dummyData }) {
  return (
    <Flex alignItems={"flex-end"} direction={"column"} gap={4}>
      <TableContainer className="w-full">
        <Table variant="simple">
          <Thead>
            <Tr>
              {TableHead.map((head) => (
                <Th
                fontSize={16}
                  key={head}
                  color={"#808080"}
                  textTransform={"capitalize"}
                  textAlign={
                    head !== "File" && head !== "Download" ? "left" : "center"
                  }
                >
                  {head}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {dummyData.map((row, rowIndex) => (
              <Tr
                fontSize={16}
                key={rowIndex}
                borderBlock={"2px solid #C7C9D9"}
                background={rowIndex % 2 === 0 ? "#F2F2F5" : "white"}
                _hover={{
                  background: "#E0F4FF",
                }}
              >
                <Td>{rowIndex + 1}</Td>
                {row.map((cell, cellIndex) => (
                  <Td
                    key={cellIndex}
                    textAlign={cellIndex !== 1 ? "left" : "center"}
                  >
                    {cell}
                  </Td>
                ))}
                <Td>
                  <Download className="m-auto" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button color={'white'} background={'#828282'} fontSize={12} px={10}>Kembali</Button>
    </Flex>
  );
}
