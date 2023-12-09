import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Calendar, Profile, Sms, Location, CloseSquare } from "iconsax-react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  fetchRecycleSelector,
} from "@/store/waste-exchange";
import { Spinner } from "@/components/spinner";

const dataTitle = {
	exchangeId: "ID Penukaran",
	username: "Nama Lengkap",
	userEmail: "Email",
	point: "Poin",
	transactionTime: "Tanggal Transaksi",
	DropPointLocation: "Lokasi Drop Point",
	wasteType: "Jenis Sampah",
	unit: "Satuan",
};

const dataTableContents = {
	exchangeId: "PS001",
	username: "John Doe",
	userEmail: "johndoe@gmail.com",
	transactionTime: "22 November 2000",
	DropPointLocation: "Drop Point A",
};

function capitalizeWords(string) {
	if (typeof string !== 'string' || string === undefined) {
	 	return '';
	}
	
	return string.replace(/\b\w/g, (char) => char.toUpperCase());
}  

function formatDate(isoDate) {
	const options = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};
  
	const [datePart] = isoDate.split("T");
	const formattedDate = new Date(datePart).toLocaleDateString("id-ID", options);
	return formattedDate;
}  

export function ModalViewDetailWasteExchange({ isOpen, onClose }) {
	const { data, status, message } = useSelector(fetchRecycleSelector);

	const detailWrapperStyles = {
		display: "flex",
		gap: "8px",
		position: "relative",
		width: "100%",
		padding: "8px",
		minWidth: "264px",
		minHeight: "64px",
	};

	const detailIconStyles = {
		marginRight: "4px",
		width: "24px",
		height: "auto",
		color: "rgba(148, 148, 148, 1)",
		flexShrink: 0
	};

	const detailGroupStyles = {
		display: "inline-flex",
		flexDirection: "column",
		justifyContent: "start",
		gap: "4px",
		position: "relative",
	};

	const thStyles = {
		position: "relative",
		fontSize: "14px",
		fontWeight: 400,
		color: "var(--dark-colors-dark-3, #828282)",
		textAlign: "left",
		textTransform: "none",
	};

	const tdStyles = {
		position: "relative",
		fontSize: "14px",
		fontWeight: 600,
		color: "var(--dark-colors-dark-3, #333)",
		textAlign: "left",
	};

	const thTableStyles = {
		fontSize: "16px",
		fontWeight: 700,
		color: "var(--dark-colors-dark-3, #828282)",
		textTransform: "none",
		paddingLeft: "22px",
		paddingRight: "22px",
	};

	const tdTableStyles = {
		color: "#393939",
		fontSize: "16px",
		fontWeight: 400,
		paddingLeft: "22px",
		paddingRight: "22px",
	};

	const unitStyle = {
		fontWeight: 600,
	};

	const poinStyle = {
		fontWeight: 600,
		color: "#D4AF35",
	};

	const handleClose = () => {
		onClose();
	};

	const data1 = [
		{ wasteType: "Plastik", unit: 5, point: 500 },
		{ wasteType: "Kertas", unit: 3, point: 700 },
	];

	if (!data || !data.trash_exchange_details) {
		return null;
	}

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
				maxW="560px"
				borderRadius="12px"
				className="max-h-[80vh] overflow-y-auto"
			>
				<ModalHeader>
					<div className="flex justify-between font-medium">
						<h5
							className="text-xl"
							style={{ color: "#828282" }}
						>
							{dataTitle.exchangeId} :
							<span
								className="text-xl ml-2"
								style={{ color: "#333" }}
							>
								{data?.id}
							</span>
						</h5>
						<CloseSquare
							size="32"
							color="rgba(130, 130, 130, 1)"
							className="cursor-pointer"
							onClick={handleClose}
						/>
					</div>
				</ModalHeader>
				<ModalBody>
					<h6 className="text-base font-bold mb-6">Detail Informasi</h6>

					<div className="flex flex-col gap-6">
						<div className="flex">
							<div
								className="items-center"
								style={{ ...detailWrapperStyles }}
							>
								<Profile style={{ ...detailIconStyles }} />
								<div
									className="items-start"
									style={{ detailGroupStyles }}
								>
									<div style={{ ...thStyles }}>{dataTitle.username}</div>
									<div style={{ ...tdStyles }}>
										{capitalizeWords(data?.name)}
									</div>
								</div>
							</div>
							<div
								className="items-center"
								style={{ ...detailWrapperStyles }}
							>
								<Sms style={{ ...detailIconStyles }} />
								<div
									className="items-start"
									style={{ detailGroupStyles }}
								>
									<div style={{ ...thStyles }}>{dataTitle.userEmail}</div>
									<div style={{ ...tdStyles }}>
										{data?.email}
									</div>
								</div>
							</div>
						</div>
						<div className="flex">
							<div
								className="items-center"
								style={{ ...detailWrapperStyles }}
							>
								<Calendar style={{ ...detailIconStyles }} />
								<div
									className="items-start"
									style={{ detailGroupStyles }}
								>
									<div style={{ ...thStyles }}>{dataTitle.transactionTime}</div>
									<div style={{ ...tdStyles }}>
										{formatDate(data?.created_at)}
									</div>
								</div>
							</div>
							<div
								className="items-center"
								style={{ ...detailWrapperStyles }}
							>
								<Location style={{ ...detailIconStyles }} />
								<div
									className="items-start"
									style={{ detailGroupStyles }}
								>
									<div style={{ ...thStyles }}>
										{dataTitle.DropPointLocation}
									</div>
									<div style={{ ...tdStyles }}>
										{data?.address}
									</div>
								</div>
							</div>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<div
						className="mb-6"
						style={{ width: "560px" }}
					>
						<Table>
							<Thead>
								<Tr>
									<Th style={{ ...thTableStyles, width: "46px" }}>No</Th>
									<Th style={{ ...thTableStyles }}>{dataTitle.wasteType}</Th>
									<Th style={{ ...thTableStyles }}>{dataTitle.unit}</Th>
									<Th style={{ ...thTableStyles }}>{dataTitle.point}</Th>
								</Tr>
							</Thead>
							<Tbody>
								{data.trash_exchange_details.map((detail, index) => (
									<Tr
										key={index + 1}
										bg={index % 2 === 0 ? "#F2F2F5" : "white"}
										borderBlock={"2px solid #C4C4C4"}
									>
										<Td style={{ ...tdTableStyles }}>{index + 1}</Td>
										<Td style={{ ...tdTableStyles }}>{detail.trash_type}</Td>
										<Td style={{ ...tdTableStyles }}>{`${detail.amount} ${detail.unit}`}</Td>
										<Td
											style={{
												...tdTableStyles,
												color: "#D4AF35",
												fontWeight: 500,
											}}
										>
											+{detail.total_points}
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
						<div className="grid grid-cols-4 mt-4">
							<div className="col-span-2">
								<p style={{ ...unitStyle, textAlign: "right" }}>Total: </p>
							</div>
							<div className="col-span-1">
								<p style={{ ...unitStyle, paddingLeft: "24px" }}>
									{data?.total_unit}
								</p>
							</div>
							<div className="col-span-1">
								<p style={{ ...poinStyle, paddingLeft: "40px" }}>
									+{data?.total_point}
								</p>
							</div>
						</div>
					</div>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
