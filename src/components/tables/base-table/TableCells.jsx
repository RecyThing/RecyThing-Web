/* eslint-disable react/prop-types */
import { Badge, Td, Text } from "@chakra-ui/react";

export function TextCell({ key, content }) {
	return (
		<Td
			key={key}
			color={"#383838"}
			maxW={"12.5rem"}
			overflowWrap={"break-word"}
			whiteSpace={"normal"}
		>
			{content}
		</Td>
	);
}

export function BadgeCell({ key, colorScheme, content }) {
	{
		switch (colorScheme) {
			case "green":
				return (
					<Td key={key}>
						<Badge
							px={"8px"}
							py={"4px"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#3FC28A"}
							bg={"#3FC28A1A"}
						>
							{content}
						</Badge>
					</Td>
				);
			case "yellow":
				return (
					<Td key={key}>
						<Badge
							px={"8px"}
							py={"4px"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#FFCD29"}
							bg={"#FFCD291A"}
						>
							{content}
						</Badge>
					</Td>
				);
			case "red":
				return (
					<Td key={key}>
						<Badge
							px={"8px"}
							py={"4px"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#FF5C5C"}
							bg={"#FF5C5C1A"}
						>
							{content}
						</Badge>
					</Td>
				);

			case "blue":
				return (
					<Td key={key}>
						<Badge
							px={"8px"}
							py={"4px"}
							fontSize={"xs"}
							fontWeight={"medium"}
							color={"#0033FF"}
							bg={"#0033FF1A"}
						>
							{content}
						</Badge>
					</Td>
				);
			default:
				return (
					<Td key={key}>
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

export function LinkCell({ key, content, onClick }) {
	return (
		<Td
			key={key}
			color={"#5B79EF"}
			maxW={"12.5rem"}
			overflowWrap={"break-word"}
			whiteSpace={"normal"}
		>
			<Text
				textAlign={"left"}
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
        <Td style={{ maxWidth: `${maxWidth}rem`, paddingLeft: "23px", paddingRight: "15px" }}>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {truncatedContent}
            </div>
        </Td>
    );
}