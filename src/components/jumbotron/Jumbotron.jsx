import JumbotronImg from "@/assets/LandingPage/jumbotron img.png";

const Jumbotron = () => {
  return (
    <>
      <div id="jumbotron" className="jumbotron grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-center lg:h-screen sm:h-full items-center  mb-24">
        <div className="text-group p-10">
          <p className="text-4xl font-bold my-5 ">
            Mulai Langkahmu untuk Lingkungan yang Lebih Baik
          </p>
          <p className="text-regular text-gray-400 my-5 w-4/5">
            Temukan cara mudah berkontribusi pada keberlanjutan lingkungan.
            Bergabunglah dengan RecyThing sekarang!
          </p>
          <div className="button-group flex gap-2 my-5 items-center">
            <button
              type="button"
              className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Download
            </button>
            <button
              type="button"
              className="focus:outline-none text-green-600  bg-white border border-green-500 hover:bg-green-500 hover:text-white focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Detail
            </button>
          </div>
        </div>
        <div className="h-screen relative md:bg-green-50 sm:bg-white rounded-bl-[5em] sm:pt-24 sm:h-full md:row-auto sm:row-start-1 ">
          <img
            src={JumbotronImg}
            alt=""
            className="mx-auto w-2/6 relative   sm:w-3/4 "
          />
        </div>
      </div>
    </>
  );
};

export default Jumbotron;
