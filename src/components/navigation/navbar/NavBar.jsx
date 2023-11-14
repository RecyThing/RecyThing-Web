import Logo from "@/assets/recything-logo.png";
import hamburger_active from "@/assets/hamburger-active.svg";
import hamburger_non_active from "@/assets/hamburger-non-active.svg";
import { useState } from "react";

function Navbar() {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  // const [color, SetColor] = useState(false);
  // const changeColor = () => {
  //   if (window.scrollY >= 72) {
  //     SetColor(true);
  //   } else {
  //     SetColor(false);
  //   }
  // };

  // window.addEventListener("scroll", changeColor);

  return (
    <>
      <nav
        className={
            window.scrollY >= 72
            ? "sticky top-0 shadow z-50 bg-white transition duration-200 ease-in-out "
            : "absolute w-full z-50 transition duration-200 ease-in-out "
        }
      >
        <div className="container mx-auto px-4 sm:px-8 lg:px-[72px] flex justify-between items-center py-3 sm:py-4">
          <div className="w-28 order-1 sm:order-2 lg:order-1">
            <img src={Logo} alt="navbar-logo" />
          </div>
          <div
            className="cursor-pointer order-2 sm:order-1 lg:hidden"
            onClick={() => setToggleNavbar(toggleNavbar ? false : true)}
          >
            <img
              className="w-9"
              src={toggleNavbar ? hamburger_active : hamburger_non_active}
              alt="toggle"
            />
          </div>
          <div className="hidden lg:block lg:order-2">
            <ul className="flex gap-14">
              <li className="text-green-500 font-semibold">
                <a href="#">Beranda</a>
              </li>
              <li>
                <a href="#">Tentang</a>
              </li>
              <li>
                <a href="#">Fitur</a>
              </li>
              <li>
                <a href="#">Promo</a>
              </li>
              <li>
                <a href="#">FaQ</a>
              </li>
            </ul>
          </div>
          <div className="hidden sm:block order-3 lg:order-3">
            <button
              type="button"
              className="focus:outline-none text-white bg-[#35CC33] hover:bg-green-600 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Download
            </button>
          </div>
        </div>
        <div className={`${toggleNavbar ? "block" : "hidden"} lg:hidden`}>
          <ul className="text-start">
            <li className="bg-[#35CC33] text-white font-semibold px-4 sm:px-8 py-2 sm:hidden">
              Download
            </li>
            <li className="text-green-500 font-semibold px-4 sm:px-8 py-2">
              <a href="#">Beranda</a>
            </li>
            <li className="px-4 sm:px-8 py-2">
              <a href="#">Tentang</a>
            </li>
            <li className="px-4 sm:px-8 py-2">
              <a href="#">Fitur</a>
            </li>
            <li className="px-4 sm:px-8 py-2">
              <a href="#">Promo</a>
            </li>
            <li className="px-4 sm:px-8 py-2">
              <a href="#">FaQ</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
