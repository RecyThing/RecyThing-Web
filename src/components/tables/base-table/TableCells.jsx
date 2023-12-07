import { Badge, Td, Text } from "@chakra-ui/react";

export function TextCell({ content, ...props }) {
	return (
		<Td
			color={"#383838"}
			maxW={"12.5rem"}
			isTruncated
		>
			<Text {...props}>{content}</Text>
		</Td>
	);
}

export function BadgeCell({ colorScheme, content }) {
	{
		switch (colorScheme) {
			case "green":
				return (
					<Td>
						<Badge
							px={"8px"}
							py={"4px"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#154C3C"}
							bg={"#C7EBD1"}
						>
							{content}
						</Badge>
					</Td>
				);
			case "yellow":
				return (
					<Td>
						<Badge
							px={"8px"}
							py={"4px"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#5F5207"}
							bg={"#FBF5D0"}
						>
							{content}
						</Badge>
					</Td>
				);
			case "red":
				return (
					<Td>
						<Badge
							px={"8px"}
							py={"4px"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#76170F"}
							bg={"#FADCD9"}
						>
							{content}
						</Badge>
					</Td>
				);
			case "blue":
				return (
					<Td>
						<Badge
							px={"8px"}
							py={"4px"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#19365D"}
							bg={"#D4E4FA"}
						>
							{content}
						</Badge>
					</Td>
				);
			case "azure":
				return (
					<Td>
						<Badge
							px={"9px"}
							py={"5px"}
							rounded={"2xl"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#fff"}
							bg={"#5BD4EF"}
						>
							{content}
						</Badge>
					</Td>
				);
			case "gold":
				return (
					<Td>
						<Badge
							px={"9px"}
							py={"5px"}
							rounded={"2xl"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#fff"}
							bg={"#D4AF35"}
						>
							{content}
						</Badge>
					</Td>
				);
			case "silver":
				return (
					<Td>
						<Badge
							px={"9px"}
							py={"5px"}
							rounded={"2xl"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#fff"}
							bg={"#BBBBBB"}
						>
							{content}
						</Badge>
					</Td>
				);
			case "bronze":
				return (
					<Td>
						<Badge
							px={"9px"}
							py={"5px"}
							rounded={"2xl"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#fff"}
							bg={"#C97513"}
						>
							{content}
						</Badge>
					</Td>
				);
			default:
				return (
					<Td>
						<Badge
							px={"8px"}
							py={"4px"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#828282"}
							bg={"#E0E0E0"}
						>
							{content}
						</Badge>
					</Td>
				);
		}
	}
}

export function CenteredCell({ children }) {
	return <Td textAlign="center">{children}</Td>;
}

export function LeftAlignCell({ children, maxWidth }) {
	return (
		<Td
			maxWidth={maxWidth || "max-content"}
			textAlign="left"
		>
			{children}
		</Td>
	);
}

export function LinkCell({ content, textAlign, onClick }) {
	return (
		<Td
			color={"#5B79EF"}
			maxW={"12.5rem"}
			overflowWrap={"break-word"}
			whiteSpace={"normal"}
			textAlign={textAlign || "center"}
		>
			<Text
				as={"button"}
				cursor={"pointer"}
				_hover={{ color: "#2C5282", textDecoration: "underline" }}
				onClick={onClick}
			>
				{content}
			</Text>
		</Td>
	);
}

export function NotFoundCell({ count }) {
	return (
		<Td
			colSpan={count}
			textAlign={"center"}
		>
			Data tidak ditemukan
		</Td>
	);
}

export function TruncatedCell({ content, maxCharLength, maxWidth }) {
	const truncatedContent =
		content.length > maxCharLength
			? `${content.substring(0, maxCharLength)}...`
			: content;

	return (
		<Td
			style={{
				maxWidth: `${maxWidth}rem`,
				paddingLeft: "23px",
				paddingRight: "15px",
			}}
		>
			<div
				style={{
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
				}}
			>
				{truncatedContent}
			</div>
		</Td>
	);
}
