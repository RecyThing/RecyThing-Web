import { Container } from "@chakra-ui/react";

export function LayoutDashboardContent({ children, ...props }) {
	return (
		<Container
			as={"section"}
			maxW={"container.2xl"}
			minH={"100vh"}
			bg={"#EBEBF0"}
			p={"1.5rem"}
			{...props}
		>
			{children}
		</Container>
	);
}
