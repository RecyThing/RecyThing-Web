import logo from "@/assets/recything-logo.png";
import hamburger_active from "@/assets/hamburger-active.svg";
import hamburger_non_active from "@/assets/hamburger-non-active.svg";
import { useState } from "react";

import "./NavBar.css";

function Navbar() {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  const [color, SetColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 72) {
      SetColor(true);
    } else {
      SetColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  const menuItems = [
    { text: "Beranda", link: "#" },
    { text: "Tentang", link: "#" },
    { text: "Fitur", link: "#" },
    { text: "Promo", link: "#" },
    { text: "FaQ", link: "#" },
  ];

  return (
    <>
      <nav className={color ? "header header-bg" : "header"}>
        <div className="container mx-auto px-4 sm:px-8 lg:px-[72px] flex justify-between items-center py-3 sm:py-4">
          <div className="w-28 order-1 sm:order-2 lg:order-1">
            <a href="/">
              <img src={logo} alt="navbar-logo" />
            </a>
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
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={
                    index === 0
                      ? "text-[#35CC33] font-semibold"
                      : ""
                  }
                >
                  <a className="hover:text-green-600" href={item.link}>
                    {item.text}
                  </a>
                </li>
              ))}
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
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`${
                  index === 0 ? "text-[#35CC33] font-semibold" : ""
                } px-4 sm:px-8 py-2`}
              >
                <a className="hover:text-[#35CC33]" href={item.link}>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
