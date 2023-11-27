import { Center, Spinner as ChakraSpinner } from "@chakra-ui/react";

export function Spinner({ width, height, containerSize, ...props }) {
	return (
		<Center height={containerSize || "100vh"}>
			<ChakraSpinner
				w={width || "100px"}
				h={height || "100px"}
				thickness={"6px"}
				speed={"0.65s"}
				emptyColor={"gray.200"}
				color={"#35CC33"}
				{...props}
			/>
		</Center>
	);
}
