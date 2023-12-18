import { Flex, Text } from "@chakra-ui/react";

export function DetailEventField({ title, content, titleProps = { fontSize: "lg", color: "#828282" }, contentProps = { fontSize: "md", color: "#333333", textAlign: "justify" } }) {
	return (
		<Flex
			flexDirection={"column"}
			gap={"0.5rem"}
		>
			<Text {...titleProps}>{title}</Text>
			<Text {...contentProps}>{content}</Text>
		</Flex>
	);
}
