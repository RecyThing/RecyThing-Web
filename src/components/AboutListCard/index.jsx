import recycle from "@/assets/LandingPage/recycle.png";
import doll from "@/assets/LandingPage/doll.png";
import star from "@/assets/LandingPage/star.png";
import stickman from "@/assets/LandingPage/stickman.png";

const CardList = () => {
  return (
    <>
      <div className="bg-green-100 p-16">
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
          {/* Card 1  */}
          <div className="max-w-xs sm:max-w-lg bg-white border border-gray-200 rounded-lg shadow p-5 mx-auto">
            <img
              className="rounded-t-lg bg-green-100 p-5 rounded-md my-5"
              src={recycle}
              alt=""
              width={85}
            />
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
              Daur Ulang Sampah milikmu
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Pelajari cara daur ulang sampah dengan benar melalui fitur ini.
              Mulai dari memilah hingga mengelola sampah, agar sampahmu bisa
              bermanfaat.
            </p>
          </div>

          {/* Card 2  */}
          <div className="max-w-xs sm:max-w-lg bg-white border border-gray-200 rounded-lg shadow p-5 mx-auto">
            <img
              className="rounded-t-lg bg-purple-100 p-5 rounded-md my-5"
              src={stickman}
              alt=""
              width={70}
            />
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
              Laporkan Tumpukan Sampah
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Kamu bisa melaporkan tumpukan sampah yang mengganggu lingkunganmu.
              Ikut berperan aktif menjaga kebersihan dan keindahan tempat
              tinggalmu.
            </p>
          </div>

          {/* Card 3  */}
          <div className="max-w-xs sm:max-w-lg bg-white border border-gray-200 rounded-lg shadow p-5 mx-auto">
            <img
              className="rounded-t-lg bg-red-100 p-5 rounded-md my-5"
              src={doll}
              alt=""
              width={85}
            />
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
              Lapor Pelanggaran Sampah
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Pelajari cara daur ulang sampah dengan benar melalui fitur ini.
              Mulai dari memilah hingga mengelola sampah, agar sampahmu bisa
              bermanfaat.
            </p>
          </div>

          {/* Card 4  */}
          <div className="max-w-xs sm:max-w-lg bg-white border border-gray-200 rounded-lg shadow p-5 mx-auto">
            <img
              className="rounded-t-lg bg-orange-100 p-5 rounded-md my-5"
              src={star}
              alt=""
              width={85}
            />
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
              Dapatkan Poin dari Missions
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Ikuti misi lingkungan yang menarik dan seru, raih poin dari setiap
              missions yang kamu selesaikan. Tantang dirimu dan jadilah pahlawan
              lingkungan!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardList;
