import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CookinStyle = () => {
  const [cuisine, setCuisine] = useState("no preference of cusine");
  const [cookingInstructions, setCookingInstructions] = useState("");
  const [dishType, setDishType] = useState("any");
  const navigate = useNavigate();
  const handleNext = (e) => {
    e.preventDefault();

    // Save user input to localStorage
    localStorage.setItem(
      "cookingStyle",
      JSON.stringify({
        cuisine,
        cookingInstructions,
        dishType,
      })
    );
    const time = localStorage.getItem("time");
    const ingridients = localStorage.getItem("ingridients");
    const healthStatus = localStorage.getItem("healthStatus");
    const cookingStyle = localStorage.getItem("cookingStyle");

    console.log("Time:", time);
    console.log("Ingredients:", ingridients);
    console.log("Health Status:", healthStatus);
    console.log("Cooking Style:", cookingStyle);

    // Clear localStorage for a new entry
    // localStorage.clear();
    navigate("/generatedRecipe");
  };
  const handlePrev = (e) => {
    e.preventDefault();
    navigate("/healthstatus");
  };
  return (
    <div>
      <form action="">
        <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto flex justify-center align-middle place-items-center h-screen  ">
          <div className="inner bg-gray-300  flex flex-col  py-5 px-6 rounded-lg w-[400px] gap-3">
            <h1 className="text-center font-extrabold text-4xl ">
              Cooking Style
            </h1>

            <h2 className="text-center font-bold text-2xl">
              Select your cooking styles and preferences ?{" "}
            </h2>
            <select
              name="cuisines"
              id="cuisines"
              className="p-2 rounded-lg"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            >
              <option value="no preference of cusine">Select a Cuisine</option>
              <option value="north_indian">North Indian</option>
              <option value="south_indian">South Indian</option>
              <option value="punjabi">Punjabi</option>
              <option value="bengali">Bengali</option>
              <option value="mughlai">Mughlai</option>
              <option value="rajasthani">Rajasthani</option>
              <option value="gujarati">Gujarati</option>
              <option value="maharashtrian">Maharashtrian</option>
              <option value="kerala">Kerala Cuisine</option>
              <option value="street_food">Indian Street Food</option>
            </select>

            <input
              type="text"
              id="cookingInstructions"
              class=" bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Any special cooking instructions ? "
              value={cookingInstructions}
              onChange={(e) => setCookingInstructions(e.target.value)}
            />
            <select
              name=""
              id=""
              className="p-2 rounded-lg"
              value={dishType}
              onChange={(e) => setDishType(e.target.value)}
            >
              <option value="any veg or non veg">Any</option>
              <option value="veg">Veg</option>
              <option value="non veg">Non Veg</option>
            </select>
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
                Generate
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CookinStyle;
