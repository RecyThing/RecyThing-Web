import download from "@/assets/download.svg";
import { CenteredCell, TextCell } from "../base-table/TableCells";
import { TableBodyRow } from "../base-table/TableRows";
import { BaseTable } from "../base-table/BaseTable";
import { Box, Image } from "@chakra-ui/react";

export function TableDownloadStatistic({ TableHead, data }) {
	return (
		<BaseTable
			data={data}
			heads={TableHead}
		>
			{data.map((row, rowIndex) => (
				<TableBodyRow
					key={rowIndex}
					index={rowIndex}
				>
					<CenteredCell>{rowIndex + 1}</CenteredCell>
					{row.map((cell, cellIndex) => (
						<TextCell
							key={cellIndex}
							content={cell}
						/>
					))}
					<CenteredCell>
						<Box cursor={"pointer"}>
							<Image
								mx={"auto"}
								src={download}
							/>
						</Box>
					</CenteredCell>
				</TableBodyRow>
			))}
		</BaseTable>
	);
}
