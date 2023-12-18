import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { Calendar, CloseSquare, Location } from "react-iconly";
import { BsRecycle } from "react-icons/bs";

const days = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];

export function ModalViewDetailDataDropPoint({ data, isOpen, onClose }) {
	function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={"3xl"}
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
					<p className="h-fit my-auto font-bold text-[#828282]">
						ID Drop Point: {data?.id}
					</p>
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

				<div className="mt-6 flex flex-col gap-8">
					<p className="font-bold text-[#828282]">Detail Transaksi</p>

					<div className="pl-2 flex gap-10">
						<div className="w-[200px] flex gap-2 text-[#828282]">
							<BsRecycle className="text-2xl" />
							<p className="font-medium">Nama Drop Point</p>
						</div>
						<p className="font-bold">{data?.name}</p>
					</div>

					<div className="pl-2 flex gap-10">
						<div className="w-[200px] flex gap-2 text-[#828282]">
							<Location className="text-2xl" />
							<p className="font-medium">Lokasi Drop Point</p>
						</div>
						<p className="font-bold max-w-sm">
							{data?.address}
						</p>
					</div>

					<div className="pl-2 flex gap-10">
						<div className="w-[200px] flex gap-2 text-[#828282]">
							<Calendar className="text-2xl" />
							<p className="font-medium">Jam Operasional</p>
						</div>
						<div className="flex flex-col gap-4">
							{days.map((day, index) => (
								<div
									key={index}
									className="flex w-96"
								>
									<p className="flex-1 font-bold">{capitalizeFirstLetter(day)}</p>
									<p className="flex-1 font-bold ml-2">
										{!data?.schedule.filter(item => item.day.toLowerCase() === day && !item.closed).shift()?.open_time ? "Tutup" :
										`${data?.schedule.filter(item => item.day.toLowerCase() === day).shift()?.open_time || ""} 
										- ${data?.schedule.filter(item => item.day.toLowerCase() === day).shift()?.close_time || ""}`}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<button
					onClick={onClose}
					className="ml-auto mt-6 p-4 w-[135px] rounded-lg text-white bg-[#828282] hover:opacity-90"
				>
					Kembali
				</button>
			</ModalContent>
		</Modal>
	);
}
