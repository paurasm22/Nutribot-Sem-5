import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const NutrimealsShow = () => {
  const { allProducts, addToCart } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div>
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-18 mx-auto ">
          <div className="flex flex-wrap m-4 ">
            {allProducts?.map((product) => (
              <div key={product._id} className="p-4 md:w-1/3 numtrimeals ">
                <div className=" border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden cursor-pointer">
                  <img
                    className="lg:h-56 md:h-40 w-full object-cover object-center max-h-48 "
                    src={product.imgsrc[0] || "https://dummyimage.com/720x400"}
                    alt={product.title}
                    onClick={() => navigate(`/product/${product._id}`)}
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
                    <div
                      className="flex items-center flex-wrap justify-start "
                      onClick={() =>
                        addToCart(
                          product?._id,
                          product?.title,
                          product?.price,
                          product?.qty,
                          product?.imgsrc[0]
                        )
                      }
                    >
                      <a className="bg-green-400 px-1 py-1 flex justify-center items-center rounded-lg font-bold  hover:bg-green-600 cursor-pointer hover:text-white ">
                        <div className="ml-1">
                          <span class="material-symbols-outlined ml-2 mr-3 py-1">
                            add_shopping_cart
                          </span>
                        </div>
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
