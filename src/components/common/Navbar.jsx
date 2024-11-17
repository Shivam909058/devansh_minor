import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import logo from "../../assets/Logo/Logo-Full-Light.jpeg";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import ProgressBar from "./progressbar";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const matchRoute = (route) => location.pathname === route;

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleDropdownToggle = () => setDropdownOpen((prev) => !prev);

  const handleMouseEnter = () => setDropdownOpen(true);

  const handleMouseLeave = () => setDropdownOpen(false);

  return (
    <div className="navbarContainer sticky top-0 left-0 z-1000">
      <div className="flex items-center justify-center bg-black border-b-[1px] border-b-richblack-800">
        <div className="flex flex-col md:flex-row w-full max-w-maxContent items-center justify-between px-4 py-2">
          {/* Logo and Mobile Menu Toggle */}
          <div className="flex items-center justify-between w-full md:w-auto px-1 py-1">
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src={logo}
                alt="Logo"
                width={150}
                height={5}
                loading="lazy"
              />
            </Link>
            <button
              className="block md:hidden text-2xl text-richblack-25 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? "✖" : <AiOutlineMenu />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            className={`${
              mobileMenuOpen ? "block" : "hidden"
            } md:block mt-4 md:mt-0`}
          >
            <ul className="flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-y-4 md:gap-y-0 md:gap-x-14">
              {NavbarLinks.map(({ title, path }, index) => (
                <li key={index} className="mb-2 md:mb-0 relative group">
                  {title === "Catalog" ? (
                    <div
                      className={`flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-100"
                          : "text-richblack-25"
                      } hover:text-yellow-200`}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <p>{title}</p>
                      <BsChevronDown />
                      {dropdownOpen && (
                        <div className="absolute left-[50%] top-[50%] z-[1000] w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-100 transition-all duration-150 group-hover:translate-y-[1.65em] lg:w-[300px]">
                          <div className="absolute left-[50%] top-0 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 bg-richblack-5"></div>
                          {loading ? (
                            <p className="text-center">Loading...</p>
                          ) : subLinks.length ? (
                            subLinks
                              .filter((subLink) => subLink?.courses?.length > 0)
                              .map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .toLowerCase()
                                    .replace(/ /g, "-")}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-500"
                                  key={i}
                                  onClick={handleDropdownToggle}
                                >
                                  {subLink.name}
                                </Link>
                              ))
                          ) : (
                            <p className="text-center">No Courses Found</p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={path}
                      className={`${
                        matchRoute(path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      } hover:text-yellow-25`}
                      onClick={closeMobileMenu}
                    >
                      {title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* User Actions - Cart / Login / Profile */}
          <div
            className={`${
              mobileMenuOpen ? "block" : "hidden"
            } md:block mt-2 md:mt-0`}
          >
            <div className="flex flex-col items-center md:flex-row md:items-center justify-center md:justify-start gap-y-4 md:gap-y-0 gap-x-8">

              {!token ? (
                <div className="flex flex-col md:flex-row items-center gap-y-4 md:gap-y-0 md:gap-x-4">
                  <Link to="/login" onClick={closeMobileMenu}>
                    <button
                      className={`rounded-md px-4 w-[90px] py-2 transition duration-300 hover:scale-95 ${
                        matchRoute("/login")
                          ? "bg-richblack-800 text-white"
                          : "bg-yellow-50 text-black hover:bg-richblack-800 hover:text-white"
                      }`}
                    >
                      Log In
                    </button>
                  </Link>
                  <Link to="/signup" onClick={closeMobileMenu}>
                    <button
                      className={`rounded-md px-4 w-[90px] py-2 transition duration-300 hover:scale-95 ${
                        matchRoute("/signup")
                          ? "bg-richblack-800 text-white"
                          : "bg-blue-50 text-white hover:bg-richblack-800 hover:text-gray-200"
                      }`}
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              ) : (
                <ProfileDropdown />
              )}
            </div>
          </div>
        </div>
      </div>
      <ProgressBar />
    </div>
  );
}

export default Navbar;
