import { useState, useEffect, useRef } from "react";
import { InputTextArea } from "@/components/inputs";
import { CloseSquare } from "iconsax-react";
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./DataCustomizationFormSchema";
import { fetchPromptSelector, updatePromptSelector, updatePrompt } from "@/store/prompt";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "@/components/spinner";

export function ModalEditCustomizationData({
	isOpen,
	onClose,
	selectedQuestion,
	selectedCategory,
}) {
	const dispatch = useDispatch();

	const [editedQuestion, setEditedQuestion] = useState('');
	const [editedCategory, setEditedCategory] = useState('');

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { data, status, message } = useSelector(fetchPromptSelector);
	const { status: updateStatus } = useSelector(updatePromptSelector);

	const handleOnSubmit = async (data) => {
		try {
			console.log("Selected Question:", selectedQuestion);
			if (selectedQuestion) {
				await dispatch(updatePrompt({ id: selectedQuestion.id, data }));
				reset();
				onClose();
			} else {
				console.error("Selected question is undefined");
			}
		} catch (error) {
			console.error("Error updating prompt:", error);
		}
	};
	

	useEffect(() => {
		if (selectedQuestion) {
			setEditedQuestion(selectedQuestion.question);
			setEditedCategory(selectedCategory);
	  
		  if (!isOpen) {
				reset();
			}
		}
	}, [selectedQuestion, selectedCategory, isOpen, reset]);	  

	useEffect(() => {
		if (data) {
			setValue("category", data.category);
			setValue("question", data.question);
		}
	}, [data, setValue]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
		>
			<ModalOverlay
				bg={"#0000000D"}
				backdropFilter={"blur(5px)"}
			/>
			<ModalContent
				maxW="900px"
				borderRadius="12px"
			>
				{(status === "loading" || updateStatus === "loading") && (
					<Spinner containerSize={"500px"} />
				)}
				{status === "failed" && <div>{message}</div>}
				{status === "success" && updateStatus === "idle" && (
				<>
					<ModalHeader className="flex justify-between mt-8">
						<h4 className="text-gray-800 text-2xl font-bold font-inter mb-2">
							Edit Data for Open AI
						</h4>
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
					<form onSubmit={handleSubmit(handleOnSubmit)}>
						<ModalBody>
							<div
								className="w-72 border rounded-xl p-3 mb-6 relative"
								style={{ borderColor: "rgba(130, 130, 130, 1)" }}
							>
								<select
									name="topik"
									id="topik"
									className="w-64 outline-none text-sm border-none bg-transparent"
									style={{ color: "rgba(79, 79, 79, 1)" }}
									value={editedCategory}
									onChange={(e) => setEditedCategory(e.target.value)}
								>
									<option value="" disabled>Pilih Topik</option>
									<option value="batasan">Batasan</option>
									<option value="informasi">Informasi</option>
									<option value="sampah anorganik">Sampah Anorganik</option>
									<option value="sampah organik">Sampah Organik</option>
								</select>
								{errors && errors.category && errors.category.message && (
									<p className="text-red-500 text-xs pt-4 -mb-8">
										{errors.category.message}
									</p>
								)}
								<label
									htmlFor="topik"
									className="text-xs absolute -top-2 left-3 bg-white px-1"
									style={{ color: "rgba(130, 130, 130, 1)" }}
								>
									Topik
								</label>
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
									{errors && errors.question && errors.question.message && (
										<p className="text-red-500 text-xs pt-16 -mb-14 ml-4">
											{errors.question.message}
										</p>
									)}
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
							>
								Simpan
								<br />
								Perubahan
							</Button>
						</ModalFooter>
					</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}