import { useState, useEffect } from "react";
import {
	Button,
	Flex,
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
import { CloseSquare, ChevronDown } from "react-iconly";
import { useForm, Controller } from "react-hook-form";
import * as Fields from "./RubbishCategoryFormFields";

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

	const [selectedUnit, setSelectedUnit] = useState("");

	const handleOnSubmit = (data) => {
		console.log(data);
		onSubmit(target, data);
		reset();
		onClose();
	};

	const rules = {
		selectUnit: {
			required: "Satuan tidak boleh kosong",
		},
	};

	useEffect(() => {
		if (target) {
			setValue("rubbishCategoryName", target[0]);
			setValue("rewardPoint", target[1]);
			setSelectedUnit(target[2]);
		}
	}, [target, setValue]);

	const handleSelectUnit = (unit) => {
		setSelectedUnit(unit);
	};

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

				<form
					className="mt-6"
					onSubmit={handleSubmit(handleOnSubmit)}
				>
					<Fields.RubbishCategoryName
						control={control}
						error={errors.rubbishCategoryName}
					/>
					<div className="flex justify-between mt-6 gap-4">
						<div className="w-3/5">
							<Fields.RewardPoint
								control={control}
								error={errors.rewardPoint}
							/>
						</div>
						<div className="w-2/5">
							<Controller
								name="selectUnit"
								control={control}
								rules={rules.selectUnit}
								render={({ field: { onChange } }) => (
									<FormControl isInvalid={error}>
										<Menu>
											<MenuButton
												px={4}
												py={2}
												width={"100%"}
												height={"53.6px"}
												transition="all 0.2s"
												borderRadius="lg"
												borderWidth="1px"
												borderColor={"#949494"}
												_hover={{ bg: "gray.100" }}
											>
												<Flex className="justify-between">
													{selectedUnit || "Pilih Satuan"} <ChevronDown />
												</Flex>
											</MenuButton>
											<MenuList>
												<MenuItem
													onClick={() => {
														handleSelectUnit("Barang");
														onChange("Barang");
													}}
												>
													Barang
												</MenuItem>
												<MenuItem
													onClick={() => {
														handleSelectUnit("Kilogram");
														onChange("Kilogram");
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
			</ModalContent>
		</Modal>
	);
}
