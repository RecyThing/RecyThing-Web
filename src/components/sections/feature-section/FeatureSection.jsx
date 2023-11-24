import { data } from "./FeatureCardList.js";

export const FeatureSection = () => {
	return (
		<>
			<div
				id="card"
				className="bg-green-100 p-16 "
			>
				<div className="wrapper mx-auto my-10">
					<p className="text-4xl text-center font-semibold my-5">
						Jelajahi Aplikasi <span className="text-green-500">Recy</span>
						<span className="text-yellow-400">Thing</span>{" "}
					</p>
					<p className="text-center text-gray-400 my-5 lg:w-1/3 md:w-2/3 sm:w-full mx-auto">
						Temukan Fitur dan sesuatu yang Akan Membuatmu untuk Jadi Pahlawan
						Lingkungan disekitarmu
					</p>
				</div>

				{/* CardList */}
				<div className="card-list grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-center">
					{data.map((data, i) => (
						<div
							className="max-w-xs sm:max-w-lg bg-white border border-gray-200 rounded-lg shadow p-5 mx-auto"
							key={i}
						>
							<img
								className={`rounded-t-lg rounded-md my-5`}
								src={data.image}
								width={80}
							/>
							<h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
								{data.title}
							</h5>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
								{data.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
