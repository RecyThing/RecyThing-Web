import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { ItemField } from "./ItemField";
import { formatDateToCustomDate } from "@/utils";

/**
 * DetailScaleReport is a component that is used to display the detail of scale type report.
 * @param {{data: any, labels: any, handleImageView: function}} props - The props object.
 * @returns {JSX.Element} The DetailScaleReport component.
 */
export function DetailScaleReport({ data, labels, handleImageView }) {
	return (
		<Grid
			templateColumns={"0.4fr 1fr"}
			rowGap={"2rem"}
		>
			{data.created_at && (
				<ItemField
					label={labels.created_at}
					content={formatDateToCustomDate(data.created_at || "2021-08-01 00:00:00")}
				/>
			)}

			{data.location && (
				<ItemField
					label={labels.location}
					content={data.location}
					casing={"capitalize"}
				/>
			)}

			{data.address_point && (
				<ItemField
					label={labels.address_point}
					content={data.address_point}
					casing={"capitalize"}
				/>
			)}

			{data.description && (
				<ItemField
					label={labels.description}
					content={data.description}
					casing={"capitalize"}
				/>
			)}

			{data.images && (
				<>
					<GridItem>
						<Text
							fontWeight={"medium"}
							color={"#333333"}
							letterSpacing={"tight"}
						>
							{labels.image}
						</Text>
					</GridItem>
					<Flex
						flexDirection={"row"}
						flexWrap={"wrap"}
						gap={"3rem"}
					>
						{data.images?.map((data, index) => (
							<Image
								key={index}
								src={data.image}
								aspectRatio={1}
								objectFit={"cover"}
								w={"10rem"}
								boxShadow={"lg"}
								borderRadius={"10px"}
								onClick={() => handleImageView(index)}
								_hover={{ cursor: "pointer" }}
							/>
						))}
					</Flex>

					{data.rejection_description && (
						<ItemField
							label={labels.rejection_description}
							content={data.rejection_description}
							casing={"capitalize"}
						/>
					)}
				</>
			)}
		</Grid>
	);
}
