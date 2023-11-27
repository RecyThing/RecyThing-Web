import { authService } from "@/configs";
import { clearAuthState } from "@/store/auth";
import {
	Button,
	Flex,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Portal,
} from "@chakra-ui/react";
import { ArrowDown2 } from "iconsax-react";
import { ArrowLeftSquare, ArrowRightSquare, Logout } from "react-iconly";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function TopBar({ setCollapse, collapse }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		authService.logout();
		dispatch(clearAuthState()); // waktu logout clear semua state nanti di store
		navigate("/login");
	};

	return (
		<div
			className="flex items-center bg-white fixed z-50"
			style={topBarStyle}
		>
			<nav className="flex items-center w-full my-2 mx-4 h-11 gap-x-1">
				{collapse ? (
					<ArrowRightSquare
						className="cursor-pointer"
						color="gray"
						onClick={() => setCollapse(false)}
					/>
				) : (
					<ArrowLeftSquare
						className="cursor-pointer"
						color="gray"
						onClick={() => setCollapse(true)}
					/>
				)}
				<div className="flex justify-end items-center w-full gap-x-2">
					<Popover placement="bottom-end">
						<PopoverTrigger>
							<Button
								bg={"white"}
								p={0}
								_hover={{ bg: "#F2F2F5" }}
							>
								<div className="flex items-center gap-x-2">
									<img
										className="h-9 w-9 rounded-full"
										src="https://i.ibb.co/4s1Pzd9/image.png"
										alt="profile"
									/>
									<div className="text-info text-left">
										<p
											className="text-xs font-medium"
											style={nameStyle}
										>
											Admin Recything
										</p>
										<p style={emailStyle}>admin123@gmail.com</p>
									</div>
									<ArrowDown2
										color="gray"
										size={16}
									/>
								</div>
							</Button>
						</PopoverTrigger>
						<Portal>
							<PopoverContent
								className="mt-2"
								w={120}
								boxShadow="base"
								rounded="md"
								fontSize={10}
								color={"#828282"}
								_hover={{ bg: "#F2F2F5", color: "red" }}
								cursor={"pointer"}
							>
								<PopoverBody
									className="flex flex-col gap-y-2"
									p={2}
									onClick={handleLogout}
								>
									<Flex
										justifyContent={"space-between"}
										alignItems={"center"}
									>
										<Logout
											size={16}
											color={"#828282"}
										/>
										<p>Keluar</p>
									</Flex>
								</PopoverBody>
							</PopoverContent>
						</Portal>
					</Popover>
				</div>
			</nav>
		</div>
	);
}
const nameStyle = {
	lineHeight: "1.2rem",
};
const emailStyle = {
	fontSize: "10px",
	color: "#828282",
	lineHeight: "1rem",
};
const topBarStyle = {
	width: "-webkit-fill-available",
	borderBottom: "1px solid #C7C9D9",
};
