import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";

const NutrimealsShow = () => {
  const { allProducts } = useContext(AppContext);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {allProducts.map((product) => (
              <div key={product._id} className="p-4 md:w-1/3">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={product.imgsrc[0] || "https://dummyimage.com/720x400"}
                    alt={product.title}
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      {product.category}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {product.title}
                    </h1>
                    <p className="leading-relaxed mb-3">
                      {product.description}
                    </p>
                    <p className="text-gray-700 font-bold text-xl mb-4">
                      ₹{product.price}
                    </p>
                    <div className="flex items-center flex-wrap ">
                      <a className="bg-green-400 px-2 py-1 flex justify-center items-center rounded-lg font-bold place-items-center hover:bg-green-600 cursor-pointer hover:text-white ">
                        <div className="ml-1">Add to Cart</div>
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NutrimealsShow;
