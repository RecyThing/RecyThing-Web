import Banner from "@/assets/LandingPage//banner-img.png";

const Login = () => {
  const handleShowPassword = () => {
    let x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  return (
    <>

      <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center p-5 h-screen">
        <div className=" banner rounded-md bg-green-500 flex justify-center items-center h-full p-10">
          <img src={Banner} alt="" className="w-4/5" />
        </div>
        <form className=" p-10 w-2/3 mx-auto ">
          <p className="text-3xl font-bold">Selamat Datang</p>
          <p className="font-regular text-gray-400 my-3 w-2/3">
            Login terlebih dahulu untuk mengakses halaman Admin
          </p>
          <div className="wrapper flex flex-col gap-3 my-3">
            <div className="relative my-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 2-8.4 7.05a1 1 0 0 1-1.2 0L1 2m18 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m18 0v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2"
                  />
                </svg>
              </div>
              <input
                type="email"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3.5  "
                placeholder="Masukan Email"
              />
            </div>
            <div className="relative my-3 flex ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
                  />
                </svg>
              </div>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3.5  "
                placeholder="Masukan Kata Sandi"
              />
              <input
                type="checkbox"
                className="absolute inset-y-0 z-50 right-5 flex items-center pl-3.5 "
                onChange={handleShowPassword}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 text-center bg-green-500 text-white font-bold rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
