import React, { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";

const Subscriptions = () => {
  const { getSubscriptions, allsubs, purchaseSubscription } =
    useContext(AppContext);
  const handleBuy = async (plantype, total) => {
    console.log("Plan Type:", plantype);
    console.log("Total Prompts:", total);

    const purchase = await purchaseSubscription(plantype, total);
    console.log("Game over bhai !", purchase);
  };

  useEffect(() => {
    getSubscriptions();
  }, [getSubscriptions]);

  const calculatePerPromptPrice = (sub) => {
    const totalPrompts = sub.free_prompts + sub.prompts;
    if (totalPrompts > 0) {
      return (sub.price / totalPrompts).toFixed(2);
    } else {
      return "N/A"; // Handle cases where the total prompts might be 0
    }
  };

  return (
    <>
      <div className="text flex flex-col justify-center align-middle items-center w-screen">
        <h1 className="mt-[40px] font-extrabold text-4xl mb-4">Our Pricings</h1>

        <div className="bg-gray-100 py-12">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap -mx-4">
              {allsubs?.map((sub) => (
                <div
                  key={sub._id}
                  className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8"
                >
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {sub.name} Plan
                    </h2>
                    <div className="mt-4">
                      <span className="text-5xl font-bold text-gray-900">
                        ₹{sub.price}
                      </span>
                      <span className="text-gray-600"></span>
                    </div>
                    <ul className="mt-6 space-y-2">
                      <li className="flex items-center">
                        <svg
                          className="h-6 w-6 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        {sub.prompts} Prompts Included
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-6 w-6 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        {sub.free_prompts} Free Prompts
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-6 w-6 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Total: {sub.free_prompts + sub.prompts} Prompts
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-6 w-6 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Per Prompt Price: ₹{calculatePerPromptPrice(sub)}
                      </li>
                    </ul>
                    <div className="mt-8">
                      <button
                        className="block w-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-center py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() =>
                          handleBuy(sub.name, sub.free_prompts + sub.prompts)
                        }
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
