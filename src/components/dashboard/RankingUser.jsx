import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { BaseTable } from "../tables/base-table/BaseTable";
import { CenteredCell, LeftAlignCell } from "../tables/base-table/TableCells";
import { TableBodyRow } from "../tables/base-table/TableRows";

function RankingUser({ data }) {
  const tableHead = ["No", "Nama Lengkap", "Email", "Total Poin", "Grafik"];

  function getNameInitial(name) {
    let initialName = "";
    if (name.trim().split(/\s+/).length > 1 && name.trim().split(/\s+/)[1])
      initialName = name.trim().split(/\s+/)[0][0].toUpperCase() + name.trim().split(/\s+/)[1][0].toUpperCase();
    else if (name.length > 1)
      initialName = name[0].toUpperCase() + name[1].toLowerCase();
    else initialName = name[0].toUpperCase();
    return initialName;
  }

  return (
    <div className="col-span-4 rounded-lg py-5 px-6 bg-white">
      <p className="mb-2 text-xl font-semibold">Peringkat Pengguna</p>
      <BaseTable data={data} heads={tableHead}>
        {data?.map((row, rowIndex) => (
          <TableBodyRow key={rowIndex} index={rowIndex}>
            <CenteredCell>{rowIndex + 1}</CenteredCell>
            <LeftAlignCell>
              <div className="flex gap-4">
                <div className="w-8 h-8 flex items-center justify-center font-bold text-sm bg-[#35CC53] text-white rounded-full">{getNameInitial(row.name)}</div>
                <p className="my-auto">{row.name}</p>
              </div>
            </LeftAlignCell>
            <LeftAlignCell>{row.email}</LeftAlignCell>
            <LeftAlignCell>{row.point.toLocaleString()}</LeftAlignCell>
            <LeftAlignCell>
              <div className={`relative rounded-full text-white w-6 h-6 ${!row.isBearish ? 'bg-[#0033FF]' : 'bg-[#FF3A29]'}`}>
                {!row.isBearish ? <FiTrendingUp className="absolute inset-0 m-auto" /> : <FiTrendingDown className="absolute inset-0 m-auto" />}
              </div>
            </LeftAlignCell>
          </TableBodyRow>
        ))}
      </BaseTable>
    </div>
  )
}

export default RankingUser;
