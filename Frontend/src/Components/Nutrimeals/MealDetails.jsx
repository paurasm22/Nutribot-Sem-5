import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import axios from "axios";

const MealDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { url, addToCart } = useContext(AppContext);
  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.product);
      setProduct(api.data.product);
      // setProducts(api.data.products);
    };
    fetchProducts();
  }, [id]);
  return (
    <div>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                {product?.brand}
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">
                {product?.title}
              </h1>
              <div class="flex mb-4">
                <a class="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                  Description
                </a>
              </div>
              <p class="leading-relaxed mb-4">{product?.description}</p>
              <div class="flex border-t border-gray-200 py-2">
                <span class="text-gray-500">Weight</span>
                <span class="ml-auto text-gray-900">{product?.weight}</span>
              </div>
              <div class="flex border-t border-gray-200 py-2">
                <span class="text-gray-500">Calories</span>
                <span class="ml-auto text-gray-900">{product?.calories}</span>
              </div>
              <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                <span class="text-gray-500">Serving Per Person`</span>
                <span class="ml-auto text-gray-900">{product?.servingpp}</span>
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">
                  ₹{product?.price}
                </span>
                <button
                  class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
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
                  Add To Cart
                </button>

                {/* <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"></button> */}
              </div>
            </div>
            <img
              alt="ecommerce"
              class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded max-w-1/2"
              src={product?.imgsrc}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MealDetails;
