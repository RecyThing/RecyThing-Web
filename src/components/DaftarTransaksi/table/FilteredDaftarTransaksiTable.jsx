import { DaftarTransaksiTable } from "@/components/DaftarTransaksi/table/DaftarTransaksiTable";
import { Pagination } from "@/components/pagination";
import { useState } from "react";

export function FilteredDaftarTransaksiTable({
  onActiveTable,
  data,
  searchTerm,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const filteredData = data.filter(([username]) =>
      username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const paginatedData = filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  {
    switch (onActiveTable) {
      case "Semua":
        return (
          <>
            <DaftarTransaksiTable
              currentPage={currentPage}
              data={paginatedData}
              itemsPerPage={itemsPerPage}
            />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onChangeItemsPerPage={setItemsPerPage}
              onChangePage={setCurrentPage}
              totalItems={filteredData.length}
            />
          </>
        );
      case "Terbaru":
        return (
          <>
            <DaftarTransaksiTable
              currentPage={currentPage}
              data={paginatedData}
              itemsPerPage={itemsPerPage}
            />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onChangeItemsPerPage={setItemsPerPage}
              onChangePage={setCurrentPage}
              totalItems={filteredData.length}
            />
          </>
        );
      case "Diproses":
        return (
          <>
            <DaftarTransaksiTable
              currentPage={currentPage}
              data={paginatedData}
              itemsPerPage={itemsPerPage}
            />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onChangeItemsPerPage={setItemsPerPage}
              onChangePage={setCurrentPage}
              totalItems={filteredData.length}
            />
          </>
        );
      case "Selesai":
        return (
          <>
            <DaftarTransaksiTable
              currentPage={currentPage}
              data={paginatedData}
              itemsPerPage={itemsPerPage}
            />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onChangeItemsPerPage={setItemsPerPage}
              onChangePage={setCurrentPage}
              totalItems={filteredData.length}
            />
          </>
        );
      
      
    }
  }
}
