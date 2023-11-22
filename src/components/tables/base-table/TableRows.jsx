import { Th, Tr } from "@chakra-ui/react";

export function TableHeadRow({ heads, textAligns }) {
	return (
		<Tr>
			{heads.map((head, index) => (
				<Th
					key={head}
					color={"#7F7F7F"}
					textAlign={textAligns[index]}
					textTransform={"capitalize"}
					fontSize={"md"}
					{...(index === 0 && { width: "5%" })}
					{...(index === heads.length - 1 && { width: "10%" })}
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
