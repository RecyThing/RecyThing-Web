import Logo from "@/assets/recything-logo.png";
import hamburger_active from "@/assets/hamburger-active.svg";
import hamburger_non_active from "@/assets/hamburger-non-active.svg";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";

export function NavBar() {
	const [toggleNavbar, setToggleNavbar] = useState(false);
	const [color, setColor] = useState(false);
	const [activeSection, setActiveSection] = useState("");
	
	const changeColor = () => {
		if (window.scrollY >= 72) {
			setColor(true);
		} else {
			setColor(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", changeColor);

		return () => {
			window.removeEventListener("scroll", changeColor);
		};
	}, []);

	const menuItems = [
		{ text: "Beranda", link: "jumbotron" },
		{ text: "Fitur", link: "card" },
		{ text: "Tentang", link: "framePahlawan" },
		{ text: "Eksplorasi", link: "frameDaurUlang" },
		{ text: "FaQ", link: "question" },
	];

	return (
    <>
      <nav
        className={
          "fixed w-full top-0 z-50 transition-all duration-500 ease-in-out " +
          (color ? "bg-white shadow" : "bg-transparent ")
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
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    activeClass="active"
                    className={
                      activeSection === item.link
                        ? "text-[#35CC33] font-semibold hover:text-green-600 cursor-pointer"
                        : "hover:text-green-600 cursor-pointer"
                    }
                    to={item.link}
                    spy={true}
                    smooth={true}
                    offset={-55}
                    duration={700}
                    onSetActive={() => setActiveSection(item.link)}
                  >
                    {item.text}
                  </Link>
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
              <li key={index}>
                <Link
                  activeClass="active"
                  className={`${
                    activeSection === item.link && color
                      ? "text-[#35CC33] font-semibold"
                      : "hover:text-green-600 cursor-pointer"
                  } px-4 sm:px-8 py-2`}
                  to={item.link}
                  spy={true}
                  smooth={true}
                  offset={-60}
                  duration={700}
                  onSetActive={() => setActiveSection(item.link)}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
