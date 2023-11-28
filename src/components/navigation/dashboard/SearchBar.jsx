/* eslint-disable react/prop-types */
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search } from "react-iconly";

export function SearchBar({ onSearch, maxLength = 25, className }) {
	const handleSearch = (e) => {
		onSearch(e.target.value);
	};

	return (
		<InputGroup
			borderRadius={"2xl"}
			w={"full"}
			className={className}
		>
			<InputLeftElement
				height={"100%"}
				pointerEvents={"none"}
			>
				<Search
					size={18}
					primaryColor="#828282"
				/>
			</InputLeftElement>
			<Input
				type="text"
				placeholder="Cari disini..."
				_placeholder={{ color: "#828282" }}
				borderRadius={"2xl"}
				borderColor={"#C4C4C4"}
				px={"2.5rem"}
				py={"1.75rem"}
				onChange={handleSearch}
				maxLength={maxLength}
			/>
		</InputGroup>
	);
}
