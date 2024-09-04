import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Ingridients = () => {
  const [ingridients, setIngridients] = useState("");
  useEffect(() => {
    // Load saved data from localStorage
    const savedIngridients = localStorage.getItem("ingridients");
    if (savedIngridients) {
      setIngridients(savedIngridients);
    }
  }, []);
  const navigate = useNavigate();
  const handleNext = (e) => {
    e.preventDefault();
    localStorage.setItem("ingridients", ingridients);
    navigate("/healthstatus");
  };
  const handlePrev = () => {
    navigate("/time");
  };
  const handleChange = (e) => {
    setIngridients(e.target.value);
  };
  return (
    <div>
      <form action="">
        <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto flex justify-center align-middle place-items-center h-screen ">
          <div className="inner bg-gray-300  flex flex-col gap-5 py-5 px-6 rounded-lg w-[400px]">
            <h1 className="text-center font-extrabold text-4xl ">
              Ingridients
            </h1>

            <h2 className="text-center font-bold text-2xl">
              List of available ingridients{" "}
            </h2>

            <input
              type="text"
              id="ingridients"
              class=" bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter ingridients (keep empty if no such restrictions  )"
              value={ingridients}
              onChange={handleChange}
            />
            <div className="flex justify-between">
              <button
                className="bg-red-400 y-300 hover:bg-green-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center"
                onClick={handlePrev}
              >
                Back
              </button>
              <button
                className="bg-green-400 y-300 hover:bg-green-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center "
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Ingridients;
