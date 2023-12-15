import * as Fields from "./WasteExchangeFormFields";
import { Trash } from "iconsax-react";
import { useEffect, useState } from "react";
import { AddSquare, CloseSquare } from "iconsax-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	Button,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./WasteExchangeFormSchema";
import { useSelector } from "react-redux";
import { createRecyclesSelector, createRecycles } from "@/store/waste-exchange";
import { APIRecycles } from "@/apis/APIWasteExchange";
import Select from 'react-select';

function capitalizeWords(string) {
	if (typeof string !== 'string' || string === undefined) {
	 	return '';
	}
	
	return string.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function ModalAddWasteExchangeData({ isOpen, onClose }) {
	const dispatch = useDispatch();
	const [categoriesData, setCategoriesData] = useState([]);
	const {
		control,
		handleSubmit,
		register,
		watch,
		formState: { errors },
		reset,
		setValue,
		clearErrors
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { status: createStatus } = useSelector(createRecyclesSelector);

	useEffect(() => {
		APIRecycles.getCategories().then(res => setCategoriesData(res.data));
	}, [])

	const { fields, append, remove } = useFieldArray({
		control,
		name: "data",
	});

	const handleOnSubmit = async (data) => {
		try {
			const newData = {
				name: data.username,
				email: data.userEmail,
				drop_point_name: data.dropPointLocation,
				trash_exchange_details: data.data?.map((detail) => {
					const selectedCategory = categoriesData.find(
						(category) => category.id === detail.trash_type
					);
					const trashTypeName = selectedCategory ? selectedCategory.trash_type : "";
					
					return {
						trash_type: trashTypeName,
						amount: parseFloat(detail.amount) || 0,
					};
				}) || [],
			};
		
			console.log("Submitting data:", newData);

			await dispatch(createRecycles(newData));
		} catch (error) {
			console.error("Error submitting data:", error);
		}
	};		
	
	useEffect(() => {
		if (!isOpen) {
			reset({
				data: [{ trash_type: "", amount: "" }],
				username: "",
				userEmail: "",
				dropPointLocation: "",
			});
		}
	}, [isOpen, reset]);

	const handleAddData = () => {
		const newEntry = { trash_type: "", amount: ""};
		append(newEntry);
	};	 

	useEffect(() => {
		if (isOpen && fields.length === 0) {
		  	handleAddData();
		}
	}, [isOpen, fields]);
	
	const calculatePoints = (trashType, unit) => {
		const selectedCategory = categoriesData.find(
			(category) => category.id === trashType
		);
		return selectedCategory ? selectedCategory.point * unit : 0;
	};

	const calculateTotalPoints = () => {
		let totalPoints = 0;
		fields.forEach((field, index) => {
			totalPoints += calculatePoints(
				watch(`data[${index}].trash_type`),
				parseFloat(watch(`data[${index}].amount`) || 0)
			)*90/100;
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
			closeOnOverlayClick={createStatus !== "loading"}
		>
			<ModalOverlay
				bg={"#0000000D"}
				backdropFilter={"blur(5px)"}
			/>
			<ModalContent
				maxW="690px"
				borderRadius="12px"
				className="max-h-[80vh] overflow-y-auto p-8"
			>
				<ModalHeader className="flex justify-between mb-6" style={{ padding: 0 }}>
					<h4 className="text-gray-800 text-2xl font-bold mb-2">
						Tambah Data Penukaran Sampah
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
							{fields && fields.map((field, index) => (
								<tr key={field.id}>
									<td>
										<div className="relative mt-6 w-52">
											<div>
												<Select
													styles={{
														menuList: (provided) => ({
															...provided,
															maxHeight: "130px",
														}),
														control: (provided) => ({
															...provided,
															borderRadius: "8px",
															border: "1px solid #828282",
														}),
													}}
													placeholder="Pilih jenis sampah"
													{...register(`data[${index}].trash_type`)}
													isSearchable={true}
													options={categoriesData.map((category) => ({
														value: category.id,
														label: capitalizeWords(category.trash_type),
														unit: category.unit,
													}))}
													onChange={(selectedOption) => {
														setValue(`data[${index}].trash_type`, selectedOption.value);
														setValue(`data[${index}].unit`, selectedOption.unit);
														clearErrors(`data[${index}].trash_type`);
													}}
												/>
												{errors?.data && errors.data[index]?.trash_type && (
													<p className="text-red-500 text-sm mt-1">
														{errors.data[index].trash_type.message}
													</p>
												)}
											</div>
										</div>
									</td>
									<td>
										<input
											{...register(`data[${index}].amount`, {
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
											name={`data[${index}].amount`}
											min="0"
											step="1"
											placeholder={`0 ${watch(`data[${index}].unit`) === 'kilogram' ? 'kg' : watch(`data[${index}].unit`) || ''}`}
										/>
										{errors?.data && errors.data[index]?.amount && (
											<p className="text-red-500 text-sm mt-1">
												{errors.data[index].amount.message}
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
											parseInt(watch(`data[${index}].amount`) || 0)
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
								name="total_points"
							>
								+{calculateTotalPoints()} <span style={{ fontSize: "14px" }}>(-10%)</span>
							</p>
						</div>
					</div>
					<div className="flex gap-4 mt-6 justify-end">
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
							px={"3.5rem"}
							py={"1.7rem"}
							_hover={{ bg: "#2DA22D" }}
							type="submit"
							isLoading={createStatus === "loading"}
						>
							Simpan
						</Button>
					</div>
				</form>
			</ModalContent>
		</Modal>
	);
}
