import { TableDownloadStatistic } from "@/components/tables";
import { LayoutDashboardContent } from "@/layout";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function DownloadStatistic() {
	const navigate = useNavigate();
	return (
		<LayoutDashboardContent>
			<Heading
				as="h1"
				color={"#201A18"}
				fontSize={"2xl"}
				fontWeight="bold"
				mb={"1.5rem"}
			>
				Download Laporan
			</Heading>
			<Flex
				bg={"white"}
				borderRadius={"xl"}
				boxShadow={"md"}
				direction={"column"}
				gap={"1.5rem"}
				p={"1.5rem"}
			>
				<TableDownloadStatistic
					TableHead={TableHead}
					data={data}
				/>
				<Button
					width={"fit-content"}
					alignSelf={"flex-end"}
					color={"white"}
					background={"#828282"}
					fontSize={12}
					px={10}
					onClick={() => navigate("/dashboard")}
				>
					Kembali
				</Button>
			</Flex>
		</LayoutDashboardContent>
	);
}

export default DownloadStatistic;

const TableHead = ["No.", "Kategori", "File", "Download"];

const data = [
	["Pengguna Aktif", "Excel"],
	["Total Komunitas", "Excel"],
	["Sampah Diterima", "Excel"],
	["Sampah Dikelola", "Excel"],
	["Acara Komunitas mendatang", "Excel"],
	["Artikel Populer", "Excel"],
	["Rubbish", "Excel"],
	["Peringkat Pengguna", "Excel"],
	["Aktivitas Laporan Pengguna", "Excel"],
];
