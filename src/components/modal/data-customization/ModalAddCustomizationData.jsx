import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import { CloseSquare } from "iconsax-react";
import { createPrompt } from "@/store/prompt";
import { InputTextArea } from "@/components/inputs";
import { schema } from "./DataCustomizationFormSchema";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export function ModalAddCustomizationData({ isOpen, onClose }) {
	const dispatch = useDispatch();

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { status: createStatus } = useSelector((state) => state.createPrompt) || {};

	const handleOnSubmit = async (data) => {
		try {
			await dispatch(createPrompt(data));
			reset();
			onClose();
		} catch (error) {
			console.error("Error creating prompt:", error);
		}
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
			isCentered
			closeOnOverlayClick={createStatus !== "loading"}
		>
			<ModalOverlay
				bg={"#0000000D"}
				backdropFilter={"blur(5px)"}
			/>
			<ModalContent
				maxW="900px"
				borderRadius="12px"
			>
				<ModalHeader className="flex justify-between mt-8">
					<h4 className="text-gray-800 text-2xl font-bold font-inter mb-2">Tambah Data for Open AI</h4>
					<CloseSquare
						size="32"
						color="rgba(130, 130, 130, 1)"
						className="cursor-pointer"
						onClick={() => {
							reset();
							onClose();
						}}
					/>
				</ModalHeader>
				<form
					onSubmit={handleSubmit(handleOnSubmit)}
					noValidate=""
				>
					<ModalBody>
						<div
							className="w-72 border rounded-xl p-3 mb-6 relative"
							style={{ borderColor: "rgba(130, 130, 130, 1)" }}
						>
							<Controller
								name="category"
								control={control}
								render={({ field }) => (
									<>
										<select
											className="w-64 outline-none text-sm border-none bg-transparent"
											style={{ color: "rgba(79, 79, 79, 1)" }}
											{...field}
										>
											<option
												value=""
												disabled
												selected
											>
												Pilih Topik
											</option>
											<option value="batasan">Batasan</option>
											<option value="informasi">Informasi</option>
											<option value="sampah anorganik">Sampah Anorganik</option>
											<option value="sampah organik">Sampah Organik</option>
										</select>
										{errors && errors.category && errors.category.message && <p className="text-red-500 text-xs pt-4 -mb-8">{errors.category.message}</p>}
										<label
											htmlFor="category"
											className="text-xs absolute -top-2 left-3 bg-white px-1"
											style={{ color: "rgba(130, 130, 130, 1)" }}
										>
											Topik
										</label>
									</>
								)}
							/>
						</div>
						<Controller
							name="question"
							control={control}
							render={({ field }) => (
								<>
									<InputTextArea
										label={"Pertanyaan"}
										rows="8"
										className={`resize-none h-36 ${errors.question ? "border-red-600" : ""}`}
										{...field}
									/>
									{errors && errors.question && errors.question.message && <p className="text-red-500 text-xs pt-16 -mb-14 ml-4">{errors.question.message}</p>}
								</>
							)}
						/>
					</ModalBody>
					<ModalFooter
						gap={4}
						marginBottom={8}
						marginTop={12}
					>
						<Button
							color={"white"}
							bg={"#828282"}
							borderRadius={"lg"}
							px={"3.5rem"}
							py={"1.7rem"}
							_hover={{ bg: "#333333" }}
							onClick={() => {
								reset();
								onClose();
							}}
							isDisabled={createStatus === "loading"}
						>
							Batal
						</Button>
						<Button
							color={"white"}
							bg={"#35CC33"}
							borderRadius={"lg"}
							px={"2rem"}
							py={"1.7rem"}
							_hover={{ bg: "#2DA22D" }}
							type="submit"
							isLoading={createStatus === "loading"}
						>
							Simpan
							<br />
							Perubahan
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
