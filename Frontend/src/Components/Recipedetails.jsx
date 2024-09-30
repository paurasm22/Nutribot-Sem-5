import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
import AppContext from "../Context/AppContext";
import ReactMarkdown from "react-markdown";
import toblur from "../assets/toblur.png";
const Recipedetails = () => {
  const { url, addToCart } = useContext(AppContext);
  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState(150); // Base price set to ₹250

  // Ingredient prices
  const exoticItems = {
    chicken: 15,
    egg: 10,
    paneer: 12,
    lamb: 20,
    fish: 18,
    shrimp: 25,
    beef: 30,
    mutton: 22,
    tofu: 12,
    mushrooms: 10,
    almonds: 8,
    walnuts: 10,
    saffron: 50,
    avocado: 15,
    quinoa: 12,
    salmon: 25,
    prawns: 20,
    lobster: 35,
    cashews: 8,
    cheese: 15,
    rice: 5,
    potatoes: 4,
    tomatoes: 3,
    onions: 3,
    garlic: 2,
    spinach: 6,
    carrots: 5,
    bell_peppers: 7,
    broccoli: 10,
    cauliflower: 8,
    lettuce: 6,
    apples: 8,
    bananas: 4,
    grapes: 9,
    oranges: 7,
    mangoes: 12,
    strawberries: 15,
    blueberries: 20,
    chocolate: 15,
    butter: 7,
    sugar: 3,
    flour: 2,
    olive_oil: 10,
    coconut_oil: 8,
    yogurt: 5,
    milk: 4,
    honey: 6,
    bread: 3,
    pasta: 7,
    noodles: 6,
  };

  // Function to estimate price based on the recipe
  const estimatePrice = (recipeText) => {
    let estimatedPrice = 250; // Base price of ₹250
    const recipeWords = new Set(recipeText.toLowerCase().split(/\W+/)); // Convert to lowercase, split by non-word characters, and store in a Set to remove duplicates

    recipeWords.forEach((word) => {
      if (exoticItems[word]) {
        estimatedPrice += exoticItems[word];
      }
    });

    setPrice(estimatedPrice);
  };

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

        // Estimate price based on the first prompt response if available
        if (response.data.data.prompts?.[0]?.response) {
          estimatePrice(response.data.data.prompts[0].response);
        }

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
            className=" bg-customBeige  p-3  mt-4 rounded-xl text-xl sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl
           mx-auto  "
          >
            <h2>
              <strong>Type :</strong> {recipe.type}
            </h2>
            <p>
              <strong>Time Given:</strong> {recipe.timegiven}
            </p>
            <p>
              <strong>Ingredients specified :</strong> {recipe.ingridientlist}
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
              <strong>Response:</strong>
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

            <div className="text-2xl font-bold mt-4">
              Estimated Price: ₹{price}
            </div>
            <p className="text-red-600 font-semibold">
              Note: The recipes generated by Nutribot are priced using our
              proprietary price estimation algorithm. Please be aware that
              prices may fluctuate over time due to changes in the cost of
              ingredients.
            </p>
            <button
              className="bg-white p-2 rounded-xl font-bold mx-auto mt-4 flex mb-5"
              onClick={() =>
                addToCart(
                  recipe._id,
                  `Customized-${recipe._id}`,
                  price,
                  1,
                  toblur
                )
              }
            >
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
