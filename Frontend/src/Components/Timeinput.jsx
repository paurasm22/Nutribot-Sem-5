import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Timeinput = () => {
  const [time, setTime] = useState("No time restrictions");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("time", time);
    navigate("/ingridients");
  };
  useEffect(() => {
    // Load saved data from localStorage
    const savedTime = localStorage.getItem("time");
    if (savedTime) {
      setTime(savedTime);
    }
  }, []);
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto flex justify-center align-middle place-items-center h-screen ">
          <div className="inner bg-gray-300  flex flex-col gap-5 py-5 px-6 rounded-lg w-[400px]">
            <h1 className="text-center font-extrabold text-4xl ">Time</h1>

            <h2 className="text-center font-bold text-2xl">
              How much time should the recipe take to prepare ?{" "}
            </h2>
            <select
              name=""
              id=""
              value={time}
              className="p-2 rounded-lg"
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="No time restrictions" defaultChecked>
                No time restrictions{" "}
              </option>
              <option value="Less than 15 minutes">
                Less than 15 minutes{" "}
              </option>
              <option value="Between 15-30 minutes">
                Between 15-30 minutes
              </option>
              <option value="more than 30 minutes">more than 30 minutes</option>
              <option value="more than 1 hour">more than 1 hour</option>
            </select>
            <button className="bg-green-400 y-300 hover:bg-green-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center ">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Timeinput;
