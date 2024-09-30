import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import nutibgremvoed from "../assets/nutibgremvoed.png";
import idea from "../assets/idea.png";
import toblur from "../assets/toblur.png";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const GeneratedRecipe = () => {
  const navigate = useNavigate();
  const { getRecipe, addToCart } = useContext(AppContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState(150); // Base price set to ₹250
  const [id, setId] = useState("");
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const time = localStorage.getItem("time");
        const ingredients = localStorage.getItem("ingridients");
        const healthStatus =
          JSON.parse(localStorage.getItem("healthStatus")) || {};
        const cookingStyle =
          JSON.parse(localStorage.getItem("cookingStyle")) || {};

        const dishType = cookingStyle?.dishType || "dish";
        const cuisine = cookingStyle?.cuisine || "any cuisine";
        const cookingInstructions = cookingStyle?.cookingInstructions || "none";

        const prompt = `
          I want a ${dishType} recipe with ingredients as ${
          ingredients || "any available ingredients"
        } which should get completed in ${time || "any time"} only. 
          I have diseases like ${healthStatus.selectedDisease1 || "none"}, ${
          healthStatus.selectedDisease2 || "none"
        }, ${healthStatus.otherConditions || "none"}. 
          Give me a recipe which I can make to serve 1. I like ${cuisine} and special cooking instructions are ${cookingInstructions}. 
          Give all list of ingredients, calories, carbs, proteins. I want to display the prompt in a chatbot so don't give formal messages! Also include the message: 'Subscribe to Nutribot for more AI-generated recipes'. 
          Don't include placeholders for links. If no ingredients are specified, still generate something. Don't return anything without a recipe.
        `;

        const apiData = await getRecipe(
          time,
          ingredients,
          healthStatus.selectedDisease1,
          healthStatus.selectedDisease2,
          healthStatus.otherConditions,
          cuisine,
          cookingInstructions,
          dishType,
          prompt
        );

        if (apiData?.data?.data?.response) {
          // console.log(apiData.data.data._id);
          setId(apiData.data.data._id);
          setRecipe(apiData.data.data.response);
          estimatePrice(apiData.data.data.response); // Calculate the price
        } else {
          throw new Error("No recipe found");
        }
      } catch (error) {
        setError("Error fetching recipe");
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
        localStorage.removeItem("time");
        localStorage.removeItem("ingridients");
        localStorage.removeItem("healthStatus");
        localStorage.removeItem("cookingStyle");
      }
    };

    fetchData();
  }, []);

  // Function to estimate price based on the recipe
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

  if (loading) {
    return (
      <div className="flex justify-center align-middle h-screen items-center">
        <div className="inner flex items-center justify-center flex-col">
          <span className="relative left-28 top-10 animate-[pulse_0.75s_infinite] font-extrabold">
            <img
              src={idea}
              alt=""
              className="h-[120px] w-[120px] md:h-[150px] md:w-[150px]"
            />
          </span>
          <img
            src={nutibgremvoed}
            alt=""
            className="h-[300px] w-[300px] drop-shadow-2xl md:h-[400px] md:w-[400px]"
          />
          <h1 className="font-bold text-5xl">Let me think </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="consine sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto flex justify-center items-center flex-col">
        <img
          src={nutibgremvoed}
          alt="Generated Recipe"
          className="h-[300px] w-[300px] mt-[30px]"
        />
        <h3 className="text-center text-3xl font-bold">
          Here is your Generated Recipe
        </h3>
        <h3>
          <div className="mt-4 text-2xl text-center">
            The quantities mentioned in the recipe generated by Nutribot serve{" "}
            <span className="font-bold text-center">One</span>
          </div>
        </h3>
        <div className="recipecontainer bg-green-400 py-5 mt-5 rounded-2xl h-auto px-5 flex align-middle flex-col">
          <ReactMarkdown className="text-xl">{recipe}</ReactMarkdown>
          <div className="text-2xl font-bold mt-4">
            Estimated Price: ₹{price}
          </div>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center mt-[20px]"
            onClick={() => navigate("/")}
          >
            Generate more
          </button>
          <button
            className="bg-yellow-400 font-bold py-2 px-4 rounded inline-flex items-center justify-center mt-[20px] hover:bg-yellow-200"
            onClick={() => addToCart(id, `Customized-${id}`, price, 1, toblur)}
          >
            Add this to cart
          </button>
        </div>
        <div className="padded h-[500px]"></div>
      </div>
    </div>
  );
};

export default GeneratedRecipe;
