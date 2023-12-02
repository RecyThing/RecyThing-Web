import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { BaseTable } from "../tables/base-table/BaseTable";
import { CenteredCell, LeftAlignCell } from "../tables/base-table/TableCells";
import { TableBodyRow } from "../tables/base-table/TableRows";

function RankingUser() {
  const tableHead = ["No", "Nama Lengkap", "Email", "Total Poin", "Grafik"];

  const data = [
    {
      name: "Ivana",
      email: "ivana@gmail.com",
      totalPoint: 30125,
      image: "https://i.mydramalist.com/EoPbW_5f.jpg",
      isBull: true,
    },
    {
      name: "Lukman",
      email: "lukman@gmail.com",
      totalPoint: 18920,
      image: "https://i.mydramalist.com/EoPbW_5f.jpg",
      isBull: true,
    },
    {
      name: "Budiman",
      email: "budiman@gmail.com",
      totalPoint: 15200,
      image: "https://i.mydramalist.com/EoPbW_5f.jpg",
      isBull: false,
    }
  ];

  return (
    <div className="col-span-4 rounded-lg py-5 px-6 bg-white">
      <p className="mb-2 text-xl font-semibold">Peringkat Pengguna</p>
      <BaseTable data={data} heads={tableHead}>
        {data.map((row, rowIndex) => (
          <TableBodyRow key={rowIndex} index={rowIndex}>
            <CenteredCell>{rowIndex + 1}</CenteredCell>
            <LeftAlignCell>
              <div className="flex gap-4">
                <img className="w-8 h-8 object-cover rounded-full" src={row.image} alt="" />
                <p className="my-auto">{row.name}</p>
              </div>
            </LeftAlignCell>
            <LeftAlignCell>{row.email}</LeftAlignCell>
            <LeftAlignCell>{row.totalPoint.toLocaleString()}</LeftAlignCell>
            <LeftAlignCell>
              <div className={`relative rounded-full text-white w-6 h-6 ${row.isBull ? 'bg-[#0033FF]' : 'bg-[#FF3A29]'}`}>
                {row.isBull ? <FiTrendingUp className="absolute inset-0 m-auto" /> : <FiTrendingDown className="absolute inset-0 m-auto" />}
              </div>
            </LeftAlignCell>
          </TableBodyRow>
        ))}
      </BaseTable>
    </div>
  )
}

export default RankingUser;
