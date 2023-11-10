/* eslint-disable react/prop-types */
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { CloseSquare, Download } from "react-iconly";

const TableHead = ["No.", "Kategori", "File", "Download"];

export function DownloadTable({ dummyData }) {
  return (
    <Flex alignItems={"flex-end"} direction={"column"}>
      <CloseSquare></CloseSquare>
      <TableContainer className="w-full">
        <Table variant="simple">
          <Thead>
            <Tr>
              {TableHead.map((head) => (
                <Th
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
              <Tr key={rowIndex} borderBlock={"2px solid #C7C9D9"} background={rowIndex % 2 === 0 ? "#F2F2F5" : "white"}>
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
    </Flex>
  );
}
