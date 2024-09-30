import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const { useraddress, getAddress, shippingAddress } = useContext(AppContext);
  useEffect(() => {
    const getadr = async () => {
      await getAddress();
    };
    getadr();
  }, [getAddress]);
  // State to store input values
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Maharashtra"); // Default state value
  const [country, setCountry] = useState("India"); // Default country value
  const [pincode, setPincode] = useState("");
  const [time, setTime] = useState("");

  // State for errors
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // Validator function
  const validateFields = () => {
    const newErrors = {};

    if (!fullName) newErrors.fullName = "Full Name is required.";
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone Number should be 10 digits.";
    }
    if (!address) newErrors.address = "Address is required.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (!country) newErrors.country = "Country is required.";
    if (!pincode) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode should be 6 digits.";
    }

    return newErrors;
  };

  // Handle checkout button click
  const handleCheckout = async () => {
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // All fields are valid, proceed to console the values
      console.log({
        fullName,
        phoneNumber,
        address,
        city,
        state,
        country,
        pincode,
        time,
      });
    }

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
      time
    );
    console.log(result);
    if (result.data.sucess === true) {
      navigate("/checkout");
    }
  };
  const handleUseOldAddress = () => {
    if (useraddress) {
      setFullName(useraddress.fullname || "");
      setPhoneNumber(useraddress.phoneNumber || "");
      setAddress(useraddress.address || "");
      setCity(useraddress.city || "");
      setState(useraddress.state || "Maharashtra"); // Default state value
      setCountry(useraddress.country || "India"); // Default country value
      setPincode(useraddress.pincode || "");
      // setTime(useraddress.timeOfDilevery || "");
    }
  };
  return (
    <div className="containers max-w-[420px] sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
      <div className="px-5 py-10 mt-14 bg-slate-100 h-auto md:px-10 md:py-10">
        <div className="text flex justify-center items-center font-bold text-3xl mb-3 md:text-5xl">
          <h1>Shipping Address </h1>
        </div>
        <div className="name mt-2 md:grid md:grid-cols-2 md:gap-3">
          <input
            type="text"
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}

          <input
            type="tel"
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="address">
          <textarea
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
            placeholder="Enter Complete Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>

        <div className="citynstate md:grid md:grid-cols-2 md:gap-3">
          {/* Dropdown for City */}
          <select
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select Locality</option>
            <option value="Airoli">Airoli</option>
            <option value="Ghansoli">Ghansoli</option>
            <option value="Kopar Khairane">Kopar Khairane</option>
            <option value="Vashi">Vashi</option>
            <option value="Sanpada">Sanpada</option>
            <option value="Nerul">Nerul</option>
            <option value="Seawoods">Seawoods</option>
            <option value="CBD Belapur">CBD Belapur</option>
            <option value="Kharghar">Kharghar</option>
            <option value="Kamothe">Kamothe</option>
            <option value="Kalamboli">Kalamboli</option>
            <option value="Panvel">Panvel</option>
            <option value="Taloja">Taloja</option>
            <option value="Ulwe">Ulwe</option>
            <option value="Dronagiri">Dronagiri</option>
          </select>
          {errors.city && <p className="text-red-500">{errors.city}</p>}

          <input
            disabled
            type="text"
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {errors.state && <p className="text-red-500">{errors.state}</p>}
        </div>

        <div className="countrynpincode md:grid md:grid-cols-2 md:gap-3">
          <input
            disabled
            type="text"
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          {errors.country && <p className="text-red-500">{errors.country}</p>}

          <input
            type="text"
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          {errors.pincode && <p className="text-red-500">{errors.pincode}</p>}
        </div>
        <div className="time">
          <input
            type="text"
            className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
            placeholder="( Optional ) Enter a specific time of dilevery ( Hour : Min )  "
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="buttons flex gap-3 justify-center items-center mt-6">
          <button
            className="useoldaffress bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center mt-3 "
            onClick={handleCheckout}
          >
            Checkout
          </button>
          {useraddress && (
            <>
              {" "}
              <button
                className="useoldaffress bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center mt-3 "
                onClick={handleUseOldAddress}
              >
                Use Old Address
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shipping;
