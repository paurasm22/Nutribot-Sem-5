import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import nutibgremvoed from "../assets/nutibgremvoed.png";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import mealicon from "../assets/meal.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import AppContext from "../Context/AppContext";
import { Bounce, toast } from "react-toastify";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const { cart, getUserCart } = useContext(AppContext);
  useEffect(() => {
    getUserCart();
  }, [cart]);

  const location = useLocation();
  const navigate = useNavigate();
  const handleNutrimeals = () => {
    navigate("/nutrimeals");
  };
  // Conditionally render the Navbar only if not on the /landingpage route
  if (location.pathname === "/landingpage" || location.pathname === "/about") {
    return null;
  }
  const handleCart = () => {
    navigate("/cart");
  };
  const handlelogout = () => {
    localStorage.clear();
    navigate("/login");

    // window.location.reload();
    toast.error("Logged Out ! ", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  return (
    <div className="h-[65px] bg-gray-200  shadow-md sticky top-0 z-50 opacity-90">
      <div
        className="inner sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl
          mx-auto flex justify-between items-center md:mb-2"
      >
        <div
          className="logo flex items-center justify-start cursor-pointer "
          onClick={() => navigate("/")}
        >
          <img
            src={nutibgremvoed}
            alt="logo"
            className="flex justify-center items-center h-[70px] my-1 md:h-[73px] md:w-[85px] md:flex md:items-center md:justify-center  "
          />
          <h1 className=" font-extrabold text-[20px]md:font-extrabold md:text-[40px] md:mb-3">
            Nutribot
          </h1>
        </div>
        {token && (
          <>
            <div className="options flex justify-center items-center place-items-center md:mb-3">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center "
                onClick={handleCart}
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                <span class="inline-flex items-center justify-center w-6 h-6 ms-1 text-s font-semibold text-blue-800 bg-blue-200 rounded-full">
                  {cart?.items?.length || 0}
                </span>
              </button>
              <button className="bg-green-400 hover:bg-green-300 text-gray-800 font-bold rounded inline-flex items-center ml-2 px-2 py-1">
                <img
                  src={mealicon}
                  alt=""
                  className="h-8 w-8"
                  onClick={handleNutrimeals}
                />
              </button>

              <DropdownButton
                as={ButtonGroup}
                id="dropdown-profile"
                title={
                  <span className="material-symbols-outlined">person</span>
                }
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded inline-flex items-center"
              >
                <Dropdown.Item onClick={() => navigate("/recipehistory")}>
                  Recipe History
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/orderhistory")}>
                  Order History
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handlelogout}>Log Out</Dropdown.Item>
              </DropdownButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
