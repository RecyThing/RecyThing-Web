import React, { useState } from "react";
import { DataReportingTable } from "../tables/DataReportingTable";
import { Flex } from "@chakra-ui/react";
import { SearchBar } from "../navigation";

// Dummy data
const DummyData = [
  ["John Doe", "john.doe@gmail.com"],
  ["Jane Doe", "jane.doe@yahoo.com"],
  ["Alice Smith", "alice.smith@hotmail.com"],
  ["Bob Johnson", "bob.johnson@outlook.com"],
  ["Charlie Davis", "charlie.davis@gmail.com"],
];

const tableHeaders = ["Name", "Email"];

const handleSearch = (term, setSearchTerm, setCurrentPage) => {
  setSearchTerm(term);
  setCurrentPage(1);
};

const TabButton = ({ label, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-[194px] h-[60px] px-10 py-4 ${
      isActive ? "bg-green-500" : "bg-transparent"
    } rounded-[11px] justify-center items-center gap-2.5 inline-flex border-none`}
  >
    <div
      className={`text-center ${
        isActive ? "text-white" : "text-gray-800"
      } text-base font-normal font-['Inter']`}
    >
      {label}
    </div>
    <div
      className={`px-3 py-0.5 ${
        isActive ? "bg-white" : "bg-gray-500"
      } rounded-full flex-col justify-start items-start gap-2.5 inline-flex`}
    >
      <div
        className={`text-center ${
          isActive ? "text-green-500" : "text-white"
        } text-sm font-semibold font-['Inter'] leading-normal`}
      >
        {count}
      </div>
    </div>
  </button>
);

const TabButtons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = DummyData.filter(
    ([name, email]) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tabs = [
    { label: "Semua", count: DummyData.length },
    { label: "Perlu Tinjauan", count: 69 },
    { label: "Diterima", count: 2 }, // Contoh angka untuk Diterima
    { label: "Ditolak", count: 1 }, // Contoh angka untuk Ditolak
  ];

  const [activeTab, setActiveTab] = useState("Semua");

  const handleTabClick = (label) => {
    setActiveTab(label);
    // Add additional logic as needed when a tab is clicked
  };

  return (
    <div className="">
      <Flex align="center" justify="space-between" mb="1.5rem">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <TabButton
              key={tab.label}
              label={tab.label}
              count={tab.count}
              isActive={activeTab === tab.label}
              onClick={() => handleTabClick(tab.label)}
            />
          ))}
        </div>
        {/* Komponen pencarian */}
        <SearchBar
          onSearch={(term) => handleSearch(term, setSearchTerm, setCurrentPage)}
        />
      </Flex>

      <div>
        {activeTab === "Semua" && (
          <div className="mt-4">
            <DataReportingTable
              currentPage={currentPage}
              data={paginatedData}
              itemsPerPage={itemsPerPage}
              headers={tableHeaders}
            />
          </div>
        )}
        {activeTab === "Perlu Tinjauan" && (
          <div className="mt-4">
            <DataReportingTable
              currentPage={currentPage}
              data={paginatedData}
              itemsPerPage={itemsPerPage}
              headers={tableHeaders}
            />
          </div>
        )}
        {activeTab === "Diterima" && (
          <div className="mt-4">
            {/* Tambahkan data atau konten yang sesuai */}
            <p>Ini adalah teks untuk tab Diterima.</p>
          </div>
        )}
        {activeTab === "Ditolak" && (
          <div className="mt-4">
            {/* Tambahkan data atau konten yang sesuai */}
            <p>Ini adalah teks untuk tab Ditolak.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabButtons;
