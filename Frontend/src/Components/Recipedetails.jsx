import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
import AppContext from "../Context/AppContext";
import ReactMarkdown from "react-markdown";
const Recipedetails = () => {
  const { url } = useContext(AppContext);
  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getParticularRecipe = async () => {
      try {
        const response = await axios.get(
          `${url}/prompts/getprecipe/${recipe_id}`, // Fixed endpoint
          {
            headers: {
              "Content-Type": "application/json",
              Auth: localStorage.getItem("token"), // Moved Auth inside headers
            },
            withCredentials: true,
          }
        );
        setRecipe(response.data.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getParticularRecipe();
  }, [recipe_id, url]); // Added url to the dependency array to ensure effect runs correctly when url changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        <h1 className="font-extrabold text-5xl text-center mt-4">
          Recipe Details
        </h1>
        {recipe ? (
          <div
            className=" bg-green-400 p-3 mt-4 rounded-xl text-xl sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl
           mx-auto "
          >
            <h2>
              <strong>Type :</strong> {recipe.type}
            </h2>
            <p>
              <strong>Time Given:</strong> {recipe.timegiven}
            </p>
            <p>
              <strong>Ingredients:</strong> {recipe.ingridientlist}
            </p>
            <p>
              <strong>Health Status 1:</strong> {recipe.healthstatus1}
            </p>
            <p>
              <strong>Health Status 2:</strong> {recipe.healthstatus2}
            </p>
            <p>
              <strong>Cuisine:</strong> {recipe.cusine}
            </p>
            <p>
              <strong>Special Cooking Instructions:</strong>{" "}
              {recipe.specialcookinginst}
            </p>
            <p>
              <strong>Responses:</strong>
            </p>

            {Array.isArray(recipe.prompts) ? (
              <ul>
                {recipe.prompts.map((prompt, index) => (
                  <li key={index}>
                    {" "}
                    <ReactMarkdown className="text-xl">
                      {prompt.response}
                    </ReactMarkdown>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No responses available.</p>
            )}
            <button className="bg-white p-2 rounded-xl font-bold mx-auto mt-4 flex mb-5">
              Add to cart
            </button>
          </div>
        ) : (
          <p>No recipe found.</p>
        )}
      </div>
      <div className="h-[500px]"></div>
    </>
  );
};

export default Recipedetails;
