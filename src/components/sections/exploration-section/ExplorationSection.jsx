import { ExplorationData } from "./ExplorationData";
import imgFrame1 from "@/assets/LandingPage/frame/frame1.png";

export function ExplorationSection() {
	const highlightKeywords = [
		"Dapatkan",
		"Poin",
		"Tukarkan",
		"Laporkan",
		"Daur",
		"Ulang",
	];

	const renderHighlightedTitle = (title) => {
		const words = title.split(" ");
		return words.map((word, index) =>
			highlightKeywords.includes(word) ? (
				<span
					key={index}
					className="text-green-400"
				>
					{index > 0 ? " " : ""}
					{word}
				</span>
			) : (
				<span key={index}>
					{index > 0 ? " " : ""}
					{word}
				</span>
			)
		);
	};
	return (
		<>
			<div
				id="framePahlawan"
				className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-row-1 justify-center items-center my-20 p-10 gap-20"
			>
				<div className="left" data-aos="fade-right" data-aos-easing="ease-in" data-aos-duration="500" data-aos-once="true">
					<img
						src={imgFrame1}
						alt=""
						className="mx-auto"
					/>
				</div>
				<div className="right" data-aos="fade-left" data-aos-easing="ease-in" data-aos-duration="500" data-aos-once="true">
					<p className="text-5xl font-semibold my-3 w-9/12">
						Jadi <span className="text-green-400"> Pahlawan Lingkungan </span>
						Untuk Masa Depan
					</p>
					<p className="font-regular text-gray-400 my-3 w-4/6">
						RecyThing adalah aplikasi ramah lingkungan yang memudahkan kamu
						melaporkan pelanggaran pembuangan sampah, menjalankan daur ulang
						sampah, dapatkan poin dari misi lingkungan, dan tukarkan poinmu
						dengan reward yang menarik. Ayo bergabunglah dengan kami dan jadi
						pahlawan lingkungan masa depan!
					</p>
					<button
						type="button"
						className="focus:outline-none my-3  text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
					>
						Selengkapnya
					</button>
				</div>
			</div>
			{ExplorationData.map((data, id) => (
				<div
					id={id === 0 ? "frameDaurUlang" : ""}
					className={`grid lg:grid-cols-2 md:grid-cols-2 sm:grid-row-1 justify-center items-center my-20 p-10 gap-20  ${
						data.id % 2 === 0 ? "transparent " : "bg-green-50"
					}`}
					key={id}
				>
					<div 
						className="left bg-green-100 rounded-[3%] pt-10"
						data-aos={`${data.id % 2 === 0 ? "fade-right" : "fade-up"}`}
						data-aos-easing="ease-in"
						data-aos-duration="500"
						data-aos-once="true"
					>
						<img
							src={data.image}
							alt=""
							className="mx-auto "
						/>
					</div>
					<div
						className={`group-text ${
							data.id % 2 === 0 ? "" : "lg:row-start-1 md:row-auto"
						}`}
						data-aos={`${data.id % 2 === 0 ? "fade-left" : "fade-down"}`}
						data-aos-easing="ease-in"
						data-aos-duration="500"
						data-aos-once="true"
					>
						<p className="text-5xl font-semibold my-3 w-9/12">
							{renderHighlightedTitle(data.title)}
						</p>
						<p className="font-regular text-gray-400 my-3 w-4/6">
							{data.description}
						</p>
					</div>
				</div>
			))}
		</>
	);
}
