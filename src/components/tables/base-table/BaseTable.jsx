import { Table, TableContainer, Tbody, Thead } from "@chakra-ui/react";
import { TableBodyRow, TableHeadRow } from "./TableRows";
import { NotFoundCell } from "./TableCells";

export function BaseTable({ data, heads, children, textAligns }) {
	return (
		<TableContainer>
			<Table>
				<Thead>
					<TableHeadRow
						heads={heads}
						textAligns={
							textAligns ||
							heads.map((head, index) => {
								if (index === 0 || index === heads.length - 1) {
									return "center";
								} else {
									return "left";
								}
							})
						}
					/>
				</Thead>
				<Tbody>
					{data.length === 0 ? (
						<TableBodyRow>
							<NotFoundCell count={heads.length} />
						</TableBodyRow>
					) : (
						children
					)}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
