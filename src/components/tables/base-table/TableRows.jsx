/* eslint-disable react/prop-types */
import { Th, Tr } from "@chakra-ui/react";

export function TableHeadRow({ heads }) {
	return (
		<Tr>
			{heads.map((head) => (
				<Th
					key={head}
					color={"#7F7F7F"}
					textAlign={head !== "No" && head !== "Aksi" ? "left" : "center"}
					textTransform={"capitalize"}
					fontSize={"md"}
					{...(head === "No" && { width: "5%" })}
					{...(head === "Aksi" && { width: "10%" })}
				>
					{head}
				</Th>
			))}
		</Tr>
	);
}

export function TableBodyRow({ index, children }) {
	return (
		<Tr
			bg={index % 2 === 0 ? "#F2F2F5" : "white"}
			borderBlock={"2px solid #C4C4C4"}
			_hover={{ bg: "#E0F3FF" }}
		>
			{children}
		</Tr>
	);
}
