import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const RecipeHistory = () => {
  const navigate = useNavigate();
  const { recipeHistory } = useContext(AppContext);
  const [recHistory, setRecHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await recipeHistory();
        // Assuming the response is an array of recipes
        setRecHistory(data || []); // Adjust based on your API response structure
        console.log("History data", data);
      } catch (error) {
        console.error("Error fetching recipe history:", error);
      }
    };

    fetchData();
  }, [recipeHistory]);

  return (
    <div className="inside sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto flex flex-col justify-center items-center">
      <div className="text">
        <h1 className="mt-5 text-5xl font-bold">Your Recipe History</h1>
      </div>
      <div className="container bg-gray-300 h-auto w-full p-5 mt-5 rounded-lg shadow-lg">
        {recHistory.length === 0 ? (
          <p className="text-white">No recipes found.</p>
        ) : (
          recHistory.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white p-4 mb-4 rounded-lg shadow-md w-full"
            >
              <h2 className="text-2xl font-bold text-gray-800">
                Cuisine: {recipe.cusine}
              </h2>
              <p className="text-gray-700">
                Time: {recipe.timegiven}, Type: {recipe.type}
              </p>
              <p className="text-gray-700">
                Health Status: {recipe.healthstatus1}, {recipe.healthstatus2}
              </p>
              <p className="text-gray-700">
                Special Cooking Instructions: {recipe.specialcookinginst}
              </p>
              <p className="text-gray-700">
                Ingredients: {recipe.ingridientlist}
              </p>
              {/* <p className="text-gray-700">
                Prompt: {recipe.prompts[0]?.prompt}
              </p> */}
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/recipedetails/${recipe._id}`)}
              >
                View Full Recipe
              </button>
              <button
                className="mt-4 ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/recipedetails/:${recipe._id}`)}
              >
                Add to cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeHistory;
