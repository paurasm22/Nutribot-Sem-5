import React from "react";
import Nutribot from "../assets/Nutribot.png";
import { TypeAnimation } from "react-type-animation";
import nutibgremvoed from "../assets/nutibgremvoed.png";
import dilevery from "../assets/dilevery.svg";
import meal from "../assets/meal.svg";
const LangingPage = () => {
  return (
    <div>
      <div className="inside sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="section1 mt-10 grid grid-rows-1 md:grid md:grid-cols-2 md:gap-4">
          <div className="logo flex justify-center items-center md:col-span-1">
            <img
              src={Nutribot}
              alt=""
              className="h-[300px] w-[300px] md:h-[400px] md:w-[400px] "
            />
          </div>

          <div className="relative flex flex-col justify-center items-center justify-items-start md:col-span-1 md:items-center md:text-center ">
            <h1 className="font-extrabold text-2xl mb-4 md:text-6xl ">
              Your One Stop
            </h1>

            <div className="flex flex-col items-center">
              <TypeAnimation
                sequence={[
                  "AI based Recipe Generator",
                  1000,
                  "Meal Solutions",
                  1000,
                ]}
                speed={50}
                style={{ fontSize: "2em" }}
                repeat={Infinity}
                className="font-bold md:text-xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="section2 inside sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto mt-10">
        <div className="text flex flex-col items-center md:flex-row md:justify-between md:gap-5  max-h-[400px]">
          <div className="logo">
            <img
              src={nutibgremvoed}
              alt=""
              className="h-[300px] w-[300px] md:h-[450px] md:w-[700px] "
            />
          </div>
          <div className="txt">
            <h1 className="font-bold text-3xl text-center md:text-left">
              AI Powered Recipe Generation
            </h1>
            <p className="text-2xl  text-center mt-5 md:text-left  ">
              Get personalized recipes based on your time, ingredients, cuisine
              preferences, and health needs. Let our AI chef craft the perfect
              meal every time."{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="section3 inside sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto mt-5">
        <div className="text flex  items-center md:flex-row md:justify-between md:gap-5 flex-col-reverse  max-h-[540px] sm:mt-14 md:mt-2 md:max-h-[360px]">
          <div className="txt">
            <h1 className="font-bold text-3xl text-center md:text-left ">
              Meal Box Delivery
            </h1>
            <p className="text-2xl  text-center mt-5 md:text-left ">
              If you're not in the mood to cook, simply order the AI-generated
              recipe as a meal box, freshly prepared and delivered right to your
              door
            </p>
          </div>
          <div className="logo  ">
            <img
              src={dilevery}
              alt=""
              className="h-[300px] w-[300px] md:h-[450px] md:w-[700px]  mt-20 "
            />
          </div>
        </div>
      </div>
      <div className="section4 inside sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto mt-5">
        <div className="text flex flex-col items-center md:flex-row md:justify-between md:gap-5  max-h-[400px]">
          <div className="logo">
            <img
              src={meal}
              alt=""
              className="h-[300px] w-[300px] md:h-[450px] md:w-[700px] "
            />
          </div>
          <div className="txt">
            <h1 className="font-bold text-3xl text-center md:text-left">
              Ready-Made Meal Boxes for Health Goals
            </h1>
            <p className="text-2xl  text-center mt-5 md:text-left ">
              Choose from a variety of ready-made meal boxes designed to support
              specific health conditions and goals. Nutritious, delicious, and
              hassle-free
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LangingPage;
