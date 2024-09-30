import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import CheckoutCart from "./CheckoutCart";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { useraddress, getAddress } = useContext(AppContext);
  const navigate = useNavigate(); // Hook for navigation
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      await useraddress; // Fetch user address
      setLoading(false); // Stop loading after fetch
    };
    fetchAddress();
  }, []);

  // console.log("User address is ", useraddress);

  // Display loading message if data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center text-center">
        Loading your Checkout Page , please wait...
      </div>
    );
  }

  // Error handling if no address is found
  if (!useraddress) {
    return (
      <div className="flex justify-center items-center text-center">
        Please Wait
      </div>
    );
  }

  return (
    <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
      <div className="text font-bold text-4xl text-center mt-3">
        Confirm Address
      </div>
      <div className="address bg-slate-300 h-auto w-auto flex justify-center items-center px-5 py-2 mt-4 ">
        <div className="inner">
          <div className="address mt-3  ">
            <ul className="">
              <li>
                <span className="font-extrabold">Name:</span>{" "}
                {useraddress?.fullname}
              </li>
              <li>
                <span className="font-extrabold">Country: </span>
                {useraddress?.country}
              </li>
              <li>
                <span className="font-extrabold">State: </span>
                {useraddress?.state}
              </li>
              <li>
                <span className="font-extrabold">City:</span>{" "}
                {useraddress?.city}
              </li>
              <li>
                <span className="font-extrabold">Address / Nearby: </span>
                {useraddress?.address}
              </li>
              <li>
                <span className="font-extrabold">Pincode : </span>
                {useraddress?.pincode}
              </li>
              <li>
                <span className="font-extrabold">Phone Number: </span>
                {useraddress?.phoneNumber}
              </li>
              <li>
                <span className="font-extrabold">Time of Delivery*: </span>
                {useraddress?.timeOfDilevery}
              </li>
            </ul>
          </div>

          {/* Button for navigating to the shipping address edit page */}
          <button
            className="flex justify-center align-middle m-auto px-4 py-1 bg-orange-500 mt-2 mb-2 hover:bg-orange-200 rounded-lg text-white"
            onClick={() => navigate("/shipping")}
          >
            Edit Address
          </button>
        </div>
      </div>

      {/* Checkout Cart Section */}
      <div className="ordered-items">
        <CheckoutCart />
      </div>
    </div>
  );
};

export default Checkout;
