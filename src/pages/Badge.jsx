import { TableBadgeList } from "@/components/tables/badge/TableBadgeList";
import { LayoutDashboardContent } from "@/layout";
import { Heading, Flex } from "@chakra-ui/react";

const DummyData = [
	{
		id: 1,
		nama: "Platinum",
		badge: "Platinum",
		tercapai: 4,
		target: 250000,
	},
	{
		id: 2,
		nama: "Gold",
		badge: "Gold",
		tercapai: 80,
		target: 100000,
	},
	{
		id: 3,
		nama: "Silver",
		badge: "Silver",
		tercapai: 119,
		target: 50000,
	},
	{
		id: 4,
		nama: "Bronze",
		badge: "Bronze",
		tercapai: 2290,
		target: 0,
	},
];

function Badge() {
	return (
		<LayoutDashboardContent>
			<Heading
				as="h1"
				color={"#201A18"}
				fontSize={"2xl"}
				fontWeight="bold"
				mb={"1.5rem"}
			>
				Kelola Lencana
			</Heading>
			<Flex
				bg={"white"}
				borderRadius={"xl"}
				boxShadow={"md"}
				direction={"column"}
				gap={"1.5rem"}
				p={"1.5rem"}
			>
				<TableBadgeList data={DummyData} />
			</Flex>
		</LayoutDashboardContent>
	);
}

export default Badge;
