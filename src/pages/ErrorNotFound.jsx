import ImgNotFound from "@/assets/LandingPage/not-found.png";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <div className="wrapper flex  flex-col justify-center items-center h-screen">
        <img src={ImgNotFound} alt="not-found" className="mx-auto w-1/4" />
        <p className="text-5xl font-bold w-1/3 my-2 text-center mx-auto">
          Oops, Halaman Tidak Ditemukan
        </p>
        <p className="w-1/3 font-bold text-sm text-center mx-auto my-3">
          Jangan Khawatir, kamu dapat kembali mengakses halaman lainnya melalui
          halaman beranda
        </p>
        <Link to="/dashboard" className="p-5 bg-green-500 text-sm mt-4 text-white mx-auto rounded-lg ">
          Kembali Ke Beranda Admin
        </Link>
      </div>
    </>
  );
};

export default NotFound;
