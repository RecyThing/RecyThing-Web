import imgFrame1 from "@/assets/LandingPage/frame/frame1.png";
import imgFrame2 from "@/assets/LandingPage/frame/frame2.png";
import imgFrame3 from "@/assets/LandingPage/frame/frame3.png";
import imgFrame4 from "@/assets/LandingPage/frame/frame4.png";

export const FrameOne = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-center items-center my-20 p-10 gap-20">
        <div className="left">
          <img src={imgFrame1} alt="" className="mx-auto" />
        </div>
        <div className="right">
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
    </>
  );
};

export const FrameTwo = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-center items-center bg-green-50 my-20 p-10 gap-20">
        <div className="left">
          <p className="text-5xl font-semibold my-3 w-3/5">
            <span className="text-green-500">Daur Ulang </span>
            Sampah disekitarmu
          </p>
          <p className="font-regular text-gray-400 my-3 w-3/6">
            Temukan Informasi dan lokasi daur ulang terdekat untuk menjaga dan
            berpartisipasi dalam upaya daur ulang sampah.
          </p>
          <button type="button" className="text-green-400 my-3">
            Selengkapnya
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
        <div className="right bg-green-200 rounded-[1rem]">
          <img src={imgFrame2} alt="" className="mx-auto pt-10 " />
        </div>
      </div>
    </>
  );
};

export const FrameThree = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-center items-center my-20 p-10 gap-20">
        <div className="left bg-green-200 rounded-[1rem]">
          <img src={imgFrame3} alt="" className="mx-auto pt-10 " />
        </div>
        <div className="right">
          <p className="text-5xl font-semibold w-3/5 my-3">
            <span className="text-green-500 ">Laporkan </span>
            Pelanggaran & Tumpukan Sampah
          </p>
          <p className="font-regular text-gray-400 w-3/6 my-3">
            Jangan biarkan sampah sembarangan merusak lingkungan Anda. laporkan
            pelanggaran dan tumpukan sampah dengan recything.
          </p>
          <button type="button" className="text-green-400 my-3">
            Selengkapnya
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export const FrameFour = () => {
  return (
    <>
      <div className="grid  lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-center items-center bg-green-50 my-20 p-10 gap-20">
        <div className="left">
          <p className="text-5xl font-semibold w-7/12 my-3">
            Ikuti Misi Lingkungan dan
            <span className="text-green-500"> Dapatkan Poin</span>
          </p>
          <p className="font-regular text-gray-400 my-3 w-3/6">
            Jadilah pahlawan lingkungan dengan mengikuti misi dan aktivitas
            lingkungan. Kumpulkan poin dari misi yang berhasil kamu lakukan.
          </p>
          <button type="button" className="text-green-400 my-3">
            Selengkapnya
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
        <div className="right pt-10 bg-green-200 rounded-[1rem]">
          <img src={imgFrame4} alt="" className="mx-auto" />
        </div>
      </div>
    </>
  );
};

export const FrameFive = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-center items-center my-20 p-10 gap-20">
        <div className="left bg-green-200 rounded-[1rem]">
          <img src={imgFrame3} alt="" className="mx-auto pt-10 " />
        </div>
        <div className="right">
          <p className="text-5xl font-semibold w-4/6 my-3">
            <span className="text-green-500 ">Tukarkan </span> Poinmu Dengan
            Voucher
          </p>
          <p className="font-regular text-gray-400 w-3/6 my-3">
            Kamu telah berkontribusi pada lingkungan, Tukarkan poin yang kamu
            dapatkan dengan berbagai voucher yang tersedia.
          </p>
          <button type="button" className="text-green-400 my-3">
            Selengkapnya
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
