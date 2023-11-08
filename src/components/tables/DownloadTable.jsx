/* eslint-disable react/prop-types */
import {
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

export function DownloadTable({dummyData}) {
  return (
    <TableContainer style={{border: "1px solid black"}} className="m-5">
      <Table variant="simple">
        <Thead>
          <Tr  >
            {TableHead.map((head, headIndex) => (
              <Th bg="#4F4F4F"
              borderTopLeftRadius={headIndex === 0 ? 10 : 0}
              borderTopRightRadius={headIndex+1 === TableHead.length ? 10 : 0}
              borderBottomLeftRadius={headIndex === 0 ? 10 : 0}
              borderBottomRightRadius={headIndex+1 === TableHead.length ? 10 : 0}
              key={head}
               color={"white"} textTransform={"capitalize"} textAlign={ head !== "File" && head !== "Download" ? "left" : "center"}>
                {head}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {dummyData.map((row, rowIndex) => (
            <Tr
              key={rowIndex}
            >
              <Td>
                {rowIndex + 1}
              </Td>
              {row.map((cell, cellIndex) => (
                <Td
                  key={cellIndex}
                  textAlign={ cellIndex !== 1 ? "left" : "center"}
                >
                  {cell}
                </Td>
              ))}
              <Td>
                <Download className="m-auto"/>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}