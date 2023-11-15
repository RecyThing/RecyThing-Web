import { BaseTable } from "./base-table/BaseTable";
import { TableBodyRow } from "./base-table/TableRows";
import { CenteredCell, LeftAlignCell } from "./base-table/TableCells";
import { CustomIconButton } from "@/components/buttons";
import { Eye, Trash } from "iconsax-react";
import { Edit } from "react-iconly";

function DataDropPointTable({ data }) {
  const TableHead = ["No", "Nama & Alamat Drop point", "Jam Operasional", "Aksi"];
  
  return (
    <div className="my-6">
      <BaseTable data={data} heads={TableHead}>
        {data.map((row, rowIndex) => (
          <TableBodyRow key={rowIndex} index={rowIndex}>
            <CenteredCell>{rowIndex + 1}</CenteredCell>
            <LeftAlignCell>
              <p>{row.name}</p>
              <p>{row.address}</p>
            </LeftAlignCell>
            <LeftAlignCell>
              <p>{row.days}</p>
              <p>{row.time}</p>
            </LeftAlignCell>
            
            <CenteredCell>
              <div className="flex gap-2">
                <CustomIconButton
                  icon={<Eye />}
                  onClick={() => {}}
                />
                <CustomIconButton
                  icon={<Edit />}
                  onClick={() => {}}
                />
                <CustomIconButton
                  icon={<Trash color="#E53535" />}
                  onClick={() => {}}
                />
              </div>
            </CenteredCell>
          </TableBodyRow>
        ))}
      </BaseTable>
    </div>
  )
}

export default DataDropPointTable;
