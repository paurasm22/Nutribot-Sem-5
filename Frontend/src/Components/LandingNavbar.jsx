import React from "react";
import nutibgremvoed from "../assets/nutibgremvoed.png";
import { useLocation, useNavigate } from "react-router-dom";

const LandingNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/register");
  };

  const handleAbout = () => {
    navigate("/about");
  };
  const handleHome = () => {
    navigate("/landingpage");
  };
  return (
    <>
      {(location.pathname === "/landingpage" ||
        location.pathname === "/about") && (
        <div className="h-[65px] bg-gray-200 shadow-md sticky top-0 z-50 opacity-90">
          <div
            className="inner sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl
            mx-auto flex justify-between items-center"
          >
            <div
              className="logo flex items-center justify-start align-middle cursor-pointer"
              onClick={handleHome}
            >
              <img
                src={nutibgremvoed}
                // onClick={navigate("/landingpage")}
                alt="logo"
                className="h-[80px] w-[85px] flex items-center justify-center align-middle"
              />
              <h1 className="font-extrabold text-[40px] mb-2">Nutribot</h1>
            </div>
            <div className="options flex justify-center items-center place-items-center mb-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 md:px-4 rounded inline-flex items-center"
                onClick={handleAbout}
              >
                About Us
              </button>
              <button
                className="bg-green-400 hover:bg-green-300 text-gray-800 font-bold py-2 px-2 md:px-4 rounded inline-flex items-center ml-2"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNavbar;
