import * as Fields from "./WasteExchangeFormFields";
import { Trash } from "iconsax-react";
import { useEffect } from "react";
import { AddSquare, CloseSquare } from "iconsax-react";
import { useForm, useFieldArray } from "react-hook-form";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./WasteExchangeFormSchema";
import { useSelector } from "react-redux";
import { createRecyclesSelector } from "@/store/waste-exchange";
import { Spinner } from "@/components/spinner";


export function ModalAddWasteExchangeData({ isOpen, onClose, onSubmit }) {
	const {
		control,
		handleSubmit,
		register,
		watch,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { status: createStatus } = useSelector(createRecyclesSelector);

	const handleOnSubmit = (data) => {
		console.log("Submitting data:", data);
		onSubmit(data);
		reset();
	};

	useEffect(() => {
		if (!isOpen) {
		  reset();
		}
	}, [isOpen, reset]);

	const { fields, append, remove } = useFieldArray({
		control,
		name: "data",
	});

	const handleAddData = () => {
		append({ trash_type: "", unit: 0 });
	};

	const calculatePoints = (trash_type, unit) => {
		let pointPerUnit = 0;

		switch (trash_type) {
			case "Elektronik":
				pointPerUnit = 1000;
				break;
			case "Kaca":
				pointPerUnit = 2500;
				break;
			case "Kaleng":
				pointPerUnit = 7500;
				break;
			case "Baterai":
				pointPerUnit = 5000;
				break;
			case "Kertas":
				pointPerUnit = 9000;
				break;
			case "Logam":
				pointPerUnit = 1000;
				break;
			case "Minyak":
				pointPerUnit = 8000;
				break;
			case "Organik":
				pointPerUnit = 4500;
				break;
			case "Pakaian":
				pointPerUnit = 10000;
				break;
			case "Plastik":
				pointPerUnit = 9000;
				break;
			case "Tekstil":
				pointPerUnit = 900;
				break;
			default:
				pointPerUnit = 0;
		}
		return pointPerUnit * unit;
	};

	const calculateTotalPoints = () => {
		let totalPoints = 0;
		fields.forEach((field, index) => {
			totalPoints += calculatePoints(
				watch(`data[${index}].trash_type`),
				parseInt(watch(`data[${index}].unit`) || 0)
			);
		});
		return totalPoints;
	};

	const handleRemoveData = (index) => {
		remove(index);
	};

	const tableInputStyles = {
		borderWidth: "1px",
		borderRadius: "8px",
		padding: "8px",
		paddingLeft: "12px",
		fontSize: "14px",
		appearance: "none",
	};

	const poinStyles = {
		fontSize: "14px",
		fontWeight: "600",
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				reset();
                onClose();
            }}
			isCentered
		>
			<ModalOverlay
				bg={"#0000000D"}
				backdropFilter={"blur(5px)"}
			/>
			<ModalContent
				maxW="690px"
				borderRadius="12px"
				className="max-h-[80vh] overflow-y-auto"
			>
				{createStatus === "loading" ? (
					<Spinner containerSize={"xl"} />
				) : (
					<>
					<ModalHeader className="flex justify-between">
						<h4 className="text-gray-800 text-2xl font-bold  mb-2">
							Tambah Data Penukaran Sampah
						</h4>
						<CloseSquare
							size="32"
							color="rgba(130, 130, 130, 1)"
							className="cursor-pointer"
							onClick={() => {
								reset({ data: [] });
								onClose();
							}}
						/>
					</ModalHeader>
					<ModalBody>
						<form onSubmit={handleSubmit(handleOnSubmit)}>
							<div className="flex gap-x-5 mb-6">
								<Fields.Username
									control={control}
									error={errors.username}
								/>
								<Fields.UserEmail
									control={control}
									error={errors.userEmail}
								/>
							</div>
							<div className="mb-6">
								<Fields.DropPointLocation
									control={control}
									error={errors.dropPointLocation}
								/>
							</div>
							<div className="w-full">
								<table className="w-full">
									<thead>
										<tr
											className="text-sm text-left"
											style={{ background: "#F2F2F5" }}
										>
											<th className="font-medium p-2">Jenis Sampah</th>
											<th className="font-medium w-44">Satuan</th>
											<th className="font-medium ">Poin</th>
											<th className="font-medium pr-4">Aksi</th>
										</tr>
									</thead>
									<tbody>
										{fields.map((field, index) => (
											<tr key={field.id}>
												<td>
													<div className="relative mt-6 w-52">
														<div className="w-2/5">
															<Fields.SelectTrashTypeField
																control={control}
																error={errors.unit}
															/>
														</div>
													</div>
												</td>
												<td>
													<input
														{...register(`data[${index}].unit`, {
															required: true,
															min: 0,
															pattern: /^[0-9]*$/,
														})}
														type="number"
														className="w-28 mt-6"
														style={{
															color: "rgba(130, 130, 130, 1)",
															borderColor: "rgba(130, 130, 130, 1)",
															...tableInputStyles,
														}}
														name={`data[${index}].unit`}
														min="0"
														step="1"
													/>
													{errors && errors.unit && errors.unit.message && (
														<p className="text-red-500 text-xs pt-1 -mb-6">
															{errors.unit.message}
														</p>
													)}
												</td>
												<td>
													<div
														className="mt-6 w-24"
														style={{
															color: "rgba(255, 205, 41, 1)",
															...poinStyles,
														}}
													>
														{calculatePoints(
															watch(`data[${index}].trash_type`),
															parseInt(watch(`data[${index}].unit`) || 0)
														)}
													</div>
												</td>
												<td>
													<div
														className="mt-6 cursor-pointer"
														onClick={() => handleRemoveData(index)}
													>
														<Trash
															size="24"
															color="rgba(229, 53, 53, 1)"
														/>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
								<div className="grid grid-cols-3 mt-6">
									<div
										className="flex items-center gap-2"
										style={{ color: "rgba(130, 130, 130, 1)" }}
									>
										<AddSquare
											size="24"
											color="rgba(148, 148, 148, 1)"
											className="cursor-pointer"
										/>
										<button
											type="button"
											onClick={handleAddData}
										>
											Tambah Data
										</button>
									</div>
									<p
										className="text-center mr-1"
										style={{ ...poinStyles }}
									>
										Total Poin
									</p>
									<p
										className="text-left ml-6"
										style={{
											color: "rgba(255, 205, 41, 1)",
											...poinStyles,
											fontSize: "18px",
										}}
									>
										+{calculateTotalPoints()}
									</p>
								</div>
							</div>
						</form>
					</ModalBody>
				</>
				)}
				<ModalFooter className="flex gap-4 mt-6 justify-end">
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
						px={"3.5rem"}
						py={"1.7rem"}
						_hover={{ bg: "#2DA22D" }}
						type="submit"
					>
						Simpan
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
