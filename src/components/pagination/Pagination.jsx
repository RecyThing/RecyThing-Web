import { Button, Flex, IconButton, Select, Text } from "@chakra-ui/react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

export function Pagination({
	currentPage,
	itemsPerPage,
	onChangeItemsPerPage,
	onChangePage,
	lastPage,
	totalItems = 0,
	options = [5, 10],
}) {
	const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
	const startPage = Math.max(1, Math.min(currentPage - 1, totalPages - 3));
	const endPage = lastPage || Math.min(totalPages, startPage + 3);

	const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	const handlePrevPage = () => {
		if (currentPage > 1) {
			onChangePage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			onChangePage(currentPage + 1);
		}
	};

	const handleLimitPage = (e) => {
		onChangeItemsPerPage(e.target.value);
		onChangePage(1);
	};

	return (
		<Flex
			justify="space-between"
			align="center"
		>
			<Flex
				justify="start"
				align="center"
				gap={"1.5rem"}
			>
				<Flex
					justify="start"
					align="center"
					gap={"1.25rem"}
				>
					<Text
						fontSize="sm"
						color="gray.400"
					>
						Menampilkan
					</Text>
					<Select
						variant="outline"
						fontSize="sm"
						defaultValue={itemsPerPage}
						cursor={"pointer"}
						onChange={(e) => handleLimitPage(e)}
					>
						{options.map((option) => (
							<option
								key={option}
								value={option}
							>
								{option}
							</option>
						))}
					</Select>
				</Flex>
				<Text
					fontSize="sm"
					color="gray.400"
				>
					Menampilkan {startItem} sampai {endItem} dari {totalItems} data
				</Text>
			</Flex>
			<Flex
				justify="start"
				align="center"
				gap={2.5}
			>
				<IconButton
					icon={<ArrowLeft2 />}
					bg={"none"}
					isDisabled={currentPage === 1}
					onClick={handlePrevPage}
				/>
				{totalItems === 1 ? (
					<Button
						variant="outline"
						borderColor="#35CC33"
						color="#35CC33"
						fontSize="sm"
						isDisabled
					>
						1
					</Button>
				) : (
					[...Array(endPage - startPage + 1)].map((_, index) => (
						<Button
							key={index}
							variant={currentPage === startPage + index ? "outline" : "ghost"}
							borderColor={
								currentPage === startPage + index ? "#35CC33" : "none"
							}
							color={currentPage === startPage + index ? "#35CC33" : "black "}
							fontSize="sm"
							onClick={() => onChangePage(startPage + index)}
						>
							{startPage + index}
						</Button>
					))
				)}
				<IconButton
					icon={<ArrowRight2 />}
					bg={"none"}
					isDisabled={currentPage === totalPages}
					onClick={handleNextPage}
				/>
			</Flex>
		</Flex>
	);
}
