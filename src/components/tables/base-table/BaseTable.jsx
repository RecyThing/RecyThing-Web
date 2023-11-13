/* eslint-disable react/prop-types */
import { Table, TableContainer, Tbody, Thead } from "@chakra-ui/react";
import { TableBodyRow, TableHeadRow } from "./TableRows";
import { NotFoundCell } from "./TableCell";

export function BaseTable({ data, heads, children }) {
	return (
		<TableContainer>
			<Table>
				<Thead>
					<TableHeadRow heads={heads} />
				</Thead>
				<Tbody>
					{data.length === 0 && (
						<TableBodyRow>
							<NotFoundCell count={heads.length} />
						</TableBodyRow>
					)}
					{children}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
