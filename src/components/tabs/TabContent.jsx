import { formatDateToLocalDate } from "@/utils";
import { Box, Flex, Grid, Image, TabPanel, Text } from "@chakra-ui/react";

export function TabContent({ data }) {
	return (
		<TabPanel
			display={"flex"}
			flexDirection={"column"}
			px={0}
			gap={"3rem"}
		>
			<Flex
				flexDirection={"row"}
				justifyContent={"center"}
				flexWrap={"wrap"}
				gap={"3rem"}
			>
				{Array.isArray(data.images) && data.images.length > 0 ? (
					data.images?.map((image) => (
						<Image
							key={image.id}
							src={image.image}
							aspectRatio={1}
							w={"10rem"}
							boxShadow={"lg"}
							borderRadius={"10px"}
						/>
					))
				) : (
					<Box
						w={"10rem"}
						h={"10rem"}
						boxShadow={"lg"}
						borderRadius={"10px"}
						bg={"#F2F2F2"}
					>
						<Text
							color={"#828282"}
							fontSize={"2xl"}
							position={"relative"}
							textAlign={"center"}
							top={"50%"}
							transform={"translateY(-50%)"}
						>
							Tidak ada bukti
						</Text>
					</Box>
				)}
			</Flex>
			<Grid
				templateColumns={"2fr 1fr"}
				columnGap={"3rem"}
			>
				<Flex
					flexDirection={"column"}
					gap={"1rem"}
				>
					<Text
						fontSize={"lg"}
						color={"#828282"}
					>
						Keterangan
					</Text>
					<Text
						color={"#333333"}
						casing={"capitalize"}
					>
						{data.description || "Tidak ada keterangan"}
					</Text>
				</Flex>
				<Flex
					flexDirection={"column"}
					gap={"1rem"}
				>
					<Text
						fontSize={"lg"}
						color={"#828282"}
					>
						Waktu Pengunggahan Bukti
					</Text>
					<Text color={"#333333"}>
						{formatDateToLocalDate(data.created_at) || "Tidak ada waktu"}
					</Text>
				</Flex>
			</Grid>
		</TabPanel>
	);
}
