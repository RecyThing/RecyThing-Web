import { Badge, Td, Text } from "@chakra-ui/react";

/**
 * Cell for showing text content
 * @param {{ content: string, maxWidth: string, props: any }} props
 */
export function TextCell({ content, maxWidth = "8rem", ...props }) {
	return (
		<Td
			color={"#383838"}
			maxW={maxWidth}
			isTruncated
		>
			<Text {...props}>{content}</Text>
		</Td>
	);
}

/**
 * Cell for showing badge content
 * @param {{ colorScheme: string, content: string }} props
 */
export function BadgeCell({ colorScheme, content }) {
	const badge = (color, bgColor, px = "8px", py = "4px", rounded = null) => (
		<Td>
			<Badge
				px={px}
				py={py}
				rounded={rounded}
				fontSize={"xs"}
				fontWeight={"medium"}
				color={color}
				bg={bgColor}
			>
				{content}
			</Badge>
		</Td>
	);

	switch (colorScheme) {
		case "green":
			return badge("#154C3C", "#C7EBD1");
		case "yellow":
			return badge("#5F5207", "#FBF5D0");
		case "red":
			return badge("#76170F", "#FADCD9");
		case "blue":
			return badge("#19365D", "#D4E4FA");
		case "azure":
			return badge("#fff", "#5BD4EF", "9px", "5px", "2xl");
		case "gold":
			return badge("#fff", "#D4AF35", "9px", "5px", "2xl");
		case "silver":
			return badge("#fff", "#BBBBBB", "9px", "5px", "2xl");
		case "bronze":
			return badge("#fff", "#C97513", "9px", "5px", "2xl");
		default:
			return badge("#828282", "#E0E0E0");
	}
}

/**
 * Cell for showing centered content
 * @param {{ children: React.ReactNode }} props
 */
export function CenteredCell({ children }) {
	return <Td textAlign="center">{children}</Td>;
}

/**
 * Cell for showing left-aligned content
 * @param {{ children: React.ReactNode, maxWidth: string }} props
 */
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

/**
 * Cell for showing link content
 * @param {{ content: string, textAlign: string, onClick: function }} props
 */
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

/**
 * Cell for showing not found content
 * @param {{ count: number }} props
 */
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

/**
 * Cell for showing truncated content
 * @param {{ content: string, maxCharLength: number, maxWidth: string }} props
 */
export function TruncatedCell({ content, maxCharLength, maxWidth }) {
	const truncatedContent = content.length > maxCharLength ? `${content.substring(0, maxCharLength)}...` : content;

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
