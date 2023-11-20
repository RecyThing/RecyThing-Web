import { Flex, Grid, Image, TabPanel, Text } from "@chakra-ui/react";

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
				{data.images.map((image, index) => (
					<Image
						key={index}
						src={image.src}
						aspectRatio={1}
						w={"10rem"}
						boxShadow={"lg"}
						borderRadius={"10px"}
					/>
				))}
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
					<Text color={"#333333"}>{data.description}</Text>
				</Flex>
				<Flex
					flexDirection={"column"}
					gap={"1rem"}
				>
					<Text
						fontSize={"lg"}
						color={"#828282"}
					>
						Waktu pengunggahan bukti
					</Text>
					<Text color={"#333333"}>
						{data.uploadTime.toLocaleDateString("id-ID", {
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					</Text>
				</Flex>
			</Grid>
		</TabPanel>
	);
}
