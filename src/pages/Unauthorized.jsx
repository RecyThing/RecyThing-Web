import {
	Button,
	Container,
	Flex,
	Heading,
	Image,
	Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import UnauthorizedImg from "@/assets/401_illustration.png";

function Unauthorized() {
	return (
		<Container
			display={"flex"}
			flexDirection={{ base: "column", md: "row" }}
			maxW={"container.xl"}
			minH={"100vh"}
			gap={"3rem"}
			py={{ base: "3rem", md: "0" }}
			centerContent
		>
			<Image
				src={UnauthorizedImg}
				alt="Unauthorized"
				aspectRatio={1 / 1}
				maxW={{ base: "100%", md: "50%" }}
				objectFit={"cover"}
				loading="lazy"
			/>
			<Flex
				direction={"column"}
				justifyContent={"center"}
				alignItems={{ base: "center", md: "flex-start" }}
				gap={"1.5rem"}
				color={"000000"}
			>
				<Heading
					fontSize={"2.75rem"}
					textAlign={{ base: "center", md: "left" }}
				>
					Oops, Halaman Tidak Diizinkan
				</Heading>
				<Text
					fontWeight={"semibold"}
					textAlign={{ base: "center", md: "left" }}
				>
					Oh tidak! Sepertinya Anda belum mendapatkan izin untuk mengakses
					halaman ini. Kami minta maaf atas ketidaknyamanan ini. Jika Anda
					merasa ini adalah kesalahan, silakan hubungi tim dukungan kami untuk
					bantuan lebih lanjut.
				</Text>
				<Button
					as={Link}
					px={"3.375rem"}
					py={"1.5rem"}
					w={"fit-content"}
					colorScheme={"mainGreen"}
					_hover={{ bg: "#2E9E2B" }}
					to={"/login"}
				>
					Kembali ke Beranda
				</Button>
			</Flex>
		</Container>
	);
}

export default Unauthorized;
