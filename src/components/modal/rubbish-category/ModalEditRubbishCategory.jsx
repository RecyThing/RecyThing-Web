import { useState, useEffect } from "react";
import {
	Button,
	FormControl,
	FormErrorMessage,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalContent,
	ModalOverlay,
} from "@chakra-ui/react";
import { CloseSquare, ChevronDown, ChevronUp } from "react-iconly";
import { useForm, Controller } from "react-hook-form";
import * as Fields from "./RubbishCategoryFormFields";
import { useSelector } from "react-redux";
import {
	fetchTrashSelector,
	fetchTrashesSelector,
	updateTrashesSelector,
} from "@/store/trash-category";
import { Spinner } from "@/components/spinner";

export function ModalEditRubbishCategory({
	isOpen,
	onClose,
	target,
	onSubmit,
	error,
}) {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
		setValue,
	} = useForm();

	const { data, status, message } = useSelector(fetchTrashSelector);
	const { status: updateStatus } = useSelector(updateTrashesSelector);

	// const [selectedUnit, setSelectedUnit] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuOpen = () => {
		setMenuOpen(!menuOpen);
	};

	const handleOnSubmit = (data) => {
		console.log(data);
		onSubmit(data, target);
		reset();
		onClose();
	};

	useEffect(() => {
		if (data) {
			setValue("trash_type", data.trash_type);
			setValue("point", data.point);
			// setSelectedUnit(data.unit);
		}
	}, [data, setValue]);

	useEffect(() => {
		if (!isOpen) {
			reset();
		}
	}, [isOpen, reset]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={"xl"}
			isCentered
		>
			<ModalOverlay
				bg={"#0000000D"}
				backdropFilter={"blur(10px)"}
			/>
			<ModalContent
				padding={"24px"}
				borderRadius={"xl"}
			>
				<div className="flex justify-between">
					<p className="font-bold text-2xl">Edit Kategori Sampah</p>
					<div
						className="cursor-pointer"
						onClick={onClose}
					>
						<CloseSquare
							primaryColor="#828282"
							size={32}
						/>
					</div>
				</div>
				{(status === "loading" || updateStatus === "loading") && (
					<Spinner containerSize={"xl"} />
				)}
				{status === "failed" && <div>{message}</div>}
				{status === "success" && updateStatus === "idle" && (
					<>
						<form
							className="mt-6"
							onSubmit={handleSubmit(handleOnSubmit)}
						>
							<Fields.TrashTypeField
								control={control}
								error={errors.trash_type}
							/>
							<div className="flex justify-between mt-6 gap-4">
								<div className="w-3/5">
									<Fields.RewardPointField
										control={control}
										error={errors.rewardPoint}
									/>
								</div>
								<div className="w-2/5">
									<Controller
										name="unit"
										control={control}
										render={({ field }) => (
											<FormControl isInvalid={error}>
												<Menu>
													<MenuButton
														as={Button}
														px={4}
														py={2}
														width={"100%"}
														height={"53.6px"}
														transition="all 0.2s"
														borderRadius="lg"
														borderWidth="1px"
														borderColor={"#949494"}
														backgroundColor={"white"}
														_hover={{ bg: "gray.100" }}
														_expanded={{
															bg: "#35CC33",
															textColor: "white",
															borderColor: "#35CC33",
														}}
														rightIcon={
															menuOpen ? <ChevronUp /> : <ChevronDown />
														}
														onClick={handleMenuOpen}
														isActive={menuOpen}
														textAlign="left"
														fontWeight="normal"
														fontSize={"14px"}
													>
														{field.value || "Pilih Satuan"}
													</MenuButton>
													<MenuList>
														<MenuItem
															onClick={() => {
																field.onChange("Barang");
															}}
														>
															Barang
														</MenuItem>
														<MenuItem
															onClick={() => {
																field.onChange("Kilogram");
															}}
														>
															Kilogram
														</MenuItem>
													</MenuList>
												</Menu>
												<FormErrorMessage>{error?.message}</FormErrorMessage>
											</FormControl>
										)}
									/>
								</div>
							</div>
							<div className="mt-6 flex justify-end gap-4 text-white">
								<Button
									color={"white"}
									bg={"#828282"}
									borderRadius={"lg"}
									px={"3.5rem"}
									py={"1.75rem"}
									_hover={{ bg: "#333333" }}
									onClick={() => {
										reset();
										onClose();
									}}
								>
									Batal
								</Button>
								<Button
									color={"white"}
									bg={"#35CC33"}
									borderRadius={"lg"}
									px={"3rem"}
									py={"1.75rem"}
									_hover={{ bg: "#2DA22D" }}
									type="submit"
								>
									Simpan
								</Button>
							</div>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
