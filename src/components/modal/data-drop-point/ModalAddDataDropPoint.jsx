/* eslint-disable no-undef */
import { InputWithLogo } from "@/components/inputs";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { ArrowLeft, CloseSquare, Location } from "react-iconly";
import { User } from "react-iconly";
import { OperationalSchedule } from "./OperationalSchedule";
import { useState } from "react";
import MyMapPicker from "./MyMapPicker";
import axios from "axios";

export function ModalAddDataDropPoint({ isOpen, onClose }) {
	const [showMap, setShowMap] = useState(false);
	const [location, setLocation] = useState({ lat: -6.200000, lng: 106.816666});
	const [zoom, setZoom] = useState(10);

	const handleChangeLocation = (lat, lng) => setLocation({lat: lat, lng: lng});
  const handleChangeZoom = (newZoom) => setZoom(newZoom);

	function getAddressLocation() {
		axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.GOOGLE_MAP_API_KEY}`)
		.then(res => {
			const address = res.data.results[0].formatted_address;
			setLocation({...location, address: address});
		}).catch(err => console.warn(err)).finally(() => setShowMap(false));
	}

	if (showMap) return <Modal isOpen={isOpen} onClose={onClose} size={"7xl"} isCentered>
		<ModalOverlay bg={"#0000000D"} backdropFilter={"blur(10px)"} />
		<ModalContent padding={"0px"} overflow={"auto"} borderRadius={"xl"}>
			<div className="relative">
				<div onClick={() => setShowMap(false)} className="absolute w-20 h-20 z-50 top-16 left-3 rounded-xl cursor-pointer bg-white">
					<ArrowLeft className="mt-4 mx-auto" size={48} />
				</div>
				<button onClick={getAddressLocation} className="absolute z-50 w-[90%] mx-auto inset-x-0 py-4 bottom-14
				rounded-lg text-white bg-[#35CC33]">Pilih Lokasi</button>
				<MyMapPicker defaultLocation={location} zoom={zoom} mapTypeId="roadmap" style={{height:'100vh'}}
				onChangeLocation={handleChangeLocation} onChangeZoom={handleChangeZoom} apiKey={process.env.GOOGLE_MAP_API_KEY} />
			</div>
		</ModalContent>
	</Modal>

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
				maxHeight={"90vh"}
				padding={"24px"}
				overflow={"auto"}
				borderRadius={"xl"}
			>
				<div className="flex justify-between">
					<p className="font-medium text-2xl">Tambah Data Lokasi Drop Point</p>
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

				<InputWithLogo
					label={"Masukkan Nama Drop Point"}
					Logo={User}
					className={"mt-10"}
				/>
				<div className="flex gap-4 mt-4">
					<InputWithLogo
						label={"Alamat Drop Point"}
						Logo={Location}
						className={"w-full"}
						value={location.address || ""}
						onChange={() => {}}
					/>
					<button onClick={() => setShowMap(true)} className="w-48 h-14 rounded-lg py-4 hover:opacity-80 text-white bg-[#35CC33]">Map</button>
				</div>

				<div className="flex gap-4 mt-4">
					<InputWithLogo
						type={"number"}
						label={"Latitude"}
						Logo={Location}
						className={"w-full"}
						value={location.lat}
						onChange={() => {}}
					/>
					<InputWithLogo
						type={"number"}
						label={"Longitude"}
						Logo={Location}
						className={"w-full"}
						value={location.lng}
						onChange={() => {}}
					/>
				</div>

				<OperationalSchedule />
				<div className="mt-9 flex justify-between text-white">
					<button
						onClick={onClose}
						className="p-4 w-[170px] rounded-lg bg-[#828282] hover:opacity-90"
					>
						Batal
					</button>
					<button
						onClick={onClose}
						className="p-4 w-[170px] rounded-lg bg-[#35CC33] hover:opacity-90"
					>
						Simpan
					</button>
				</div>
			</ModalContent>
		</Modal>
	);
}
