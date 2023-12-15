import download_img from "@/assets/download-img.png";
import app_store from "@/assets/app-store.svg";
import play_store from "@/assets/play-store.svg";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function DownloadSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false });

	return (
		<>
			<div className="download px-4 lg:px-[72px] pt-[80px] lg:pt-[226px] pb-[60px] lg:pb-[120px] relative">
				<div 
					className="shape rounded-2xl lg:rounded-[3rem] lg:h-[320px] bg-[#35CC33] p-5 lg:p-0 overflow-visible lg:flex"
					ref={ref}
					style={{
						transform: isInView ? "none" : "translateX(100px)",
						opacity: isInView ? 1 : 0,
						transition: "all 0.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
					}}
				>
					<div 
						className="relative w-[187px] lg:w-[493px] z-10"
						ref={ref}
						style={{
							transform: isInView ? "none" : "translateX(-100px)",
							opacity: isInView ? 1 : 0,
							transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.175s"
						}}
					>
						<img
							src={download_img}
							alt="download-img"
							className="w-full h-auto -mt-14 lg:-mt-[180px]"
						/>
					</div>
					<div 
						className="text-group flex flex-col gap-2 mt-2 lg:py-12 lg:pl-28"
						ref={ref}
						style={{
							transform: isInView ? "none" : "translateX(100px)",
							opacity: isInView ? 1 : 0,
							transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.175s"
						}}
					>
						<p className="text-lg lg:text-4xl text-white font-semibold">
							Download Sekarang Juga
						</p>
						<p className="text-regular lg:text-2xl text-white">
							Download Sekarang dan <br />
							Mulai Jadi Pahlawan Lingkungan!
						</p>
						<div className="button-group flex gap-4 items-center mt-4">
							<button
								type="button"
								className="order-1 lg:order-2 focus:outline-none text-black bg-white hover:bg-gray-200 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center"
							>
								<div>
									<img
										className="w-8"
										src={app_store}
										alt="app-store-icon"
									/>
								</div>
								<div className="ml-4">
									<p className="flex flex-col text-left">
										<span className="text-[8px] font-normal h-3">
											Available on
										</span>
										<span className="text-[16px] font-bold">App Store</span>
									</p>
								</div>
							</button>
							<button
								type="button"
								className="order-2 lg:order-1 focus:outline-none text-black bg-white hover:bg-gray-200 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center"
							>
								<div>
									<img
										className="w-8"
										src={play_store}
										alt="play-store-icon"
									/>
								</div>
								<div className="ml-4">
									<p className="flex flex-col text-left">
										<span className="text-[8px] font-normal h-3">
											Available on
										</span>
										<span className="font-bold h">App Store</span>
									</p>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
