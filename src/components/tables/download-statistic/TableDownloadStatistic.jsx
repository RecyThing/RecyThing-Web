import { CenteredCell, TextCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { BaseTable } from "../base-table/BaseTable";
import { Box } from "@chakra-ui/react";
import { DownloadOutlineIcon } from "@/components/icons";

export function TableDownloadStatistic({ TableHead, data }) {
  return (
    <BaseTable data={data} heads={TableHead}>
      {data.map((row, rowIndex) => (
        <TableBodyRow key={rowIndex} index={rowIndex}>
          <CenteredCell>{rowIndex + 1}</CenteredCell>
          {row.map((cell, cellIndex) => (
            <TextCell key={cellIndex} content={cell} />
          ))}
          <CenteredCell>
            <Box cursor={"pointer"} width={"fit-content"} mx={"auto"}>
              <DownloadOutlineIcon />
            </Box>
          </CenteredCell>
        </TableBodyRow>
      ))}
    </BaseTable>
  );
}
