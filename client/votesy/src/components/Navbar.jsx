import { heartLogo } from "../assets";
import { navigation } from "../constants";
import { useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { NavLink } from "react-router-dom";
import MenuSvg from "./MenuSvg";
import VoteButton from "./VoteButton";

const Navbar = () => {
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-[17px] font-semibold leading-5 transition-all duration-150 rounded-lg px-3 py-2 bg-gray-100 text-blue-600 font-poppins"
      : "text-[17px] font-semibold leading-5 transition-all duration-150 rounded-lg px-3 py-2 text-gray-950 hover:bg-gray-100 hover:text-blue-600 font-poppins";

  return (
    <header
      className={`fixed top-0 bg-white left-0 w-full z-50 border-b-[2px] border-pink-400  shadow-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 ">
        <NavLink to="#hero" className=" w-[15rem] xl:mr-8 inline-flex items-center font-extrabold text-2xl text-pink-600">
          <img src={heartLogo} width={50} height={30} alt="heartLogo" />{" "}VOTESY
        </NavLink>

        <nav
          className={` ${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row bg-white">
            {navigation.map((item) => (
              <NavLink
                key={item.id}
                to={item.url}
                onClick={handleClick}
                className={`block relative text-2xl uppercase font-poppins hover:text-pink-600 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold`}
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </nav>
        <NavLink
          to="/signup"
          className="hidden lg:block mr-8"
        >
          <VoteButton/>
        </NavLink>
  

        <NavLink className="ml-auto lg:hidden border border-pink-600 border-dashed py-4 px-2 text-pink-400" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
