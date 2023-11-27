import { Button, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { CloseSquare } from "react-iconly";
import * as Fields from "./RubbishCategoryFormFields";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function ModalAddRubbishCategory({ isOpen, onClose, onSubmit }) {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm();

	const handleOnSubmit = (data) => {
		console.log(data);
		onSubmit(data);
		reset();
		onClose();
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
					<p className="font-bold text-2xl">Tambah Kategori Sampah</p>
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
							<Fields.SelectUnit
								control={control}
								error={errors.selectUnit}
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
							Tambah
						</Button>
					</div>
				</form>
			</ModalContent>
		</Modal>
	);
}
