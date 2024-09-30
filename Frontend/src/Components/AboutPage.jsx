import React from "react";

const AboutPage = () => {
  return (
    <>
      <div
        className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-6
           mx-auto bg-white rounded-lg shadow-lg "
      >
        <h1 className="text-4xl font-bold mb-4 text-center pt-7">
          About Nutribot
        </h1>
        <p className="text-lg mb-6">
          Welcome to{" "}
          <strong className="text-green-400 cursor-pointer">Nutribot</strong>,
          the next-generation AI-driven recipe generator designed to
          revolutionize the way you approach meal planning. In a world where
          recipe websites offer generic solutions based on ingredients, time, or
          dietary restrictions, Nutribot stands out by delivering a level of
          specificity and personalization that you won't find anywhere else.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Why Nutribot?</h2>

        <div className="space-y-6 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              1. Precision in Every Recipe
            </h3>
            <p>
              Unlike standard recipe generators that offer broad recommendations
              based on a few parameters, Nutribot takes customization to the
              next level. Our advanced AI algorithms delve deep into your
              specific needs and preferences. Whether you're searching for
              recipes that cater to a rare dietary requirement, a particular
              cuisine, or even specific health goals, Nutribot provides tailored
              solutions with unparalleled precision.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              2. Address Unique Health Needs
            </h3>
            <p>
              Health is personal, and so is Nutribot. We understand that
              managing specific health conditions or dietary concerns requires
              more than just a list of ingredients. Our system integrates
              comprehensive health and dietary information to suggest recipes
              that align perfectly with your individual health needs. From
              managing chronic diseases to optimizing nutrition for athletic
              performance, Nutribot is your trusted partner in achieving
              wellness through food.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              3. Efficiency Meets Innovation
            </h3>
            <p>
              Time is valuable, and so is convenience. Nutribot streamlines the
              recipe selection process by offering smart suggestions based on
              your available ingredients, cooking time, and even your kitchen
              tools. Our AI not only saves you time but also ensures that every
              recipe suggestion maximizes flavor and nutrition without
              compromising on ease of preparation.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              4. Personalized Culinary Experience
            </h3>
            <p>
              Our platform isn't just about food; it's about creating a
              personalized culinary experience. Nutribot learns from your
              preferences, feedback, and dietary habits to continually refine
              its suggestions. This means that over time, your experience
              becomes more intuitive and aligned with your evolving tastes and
              needs.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Join the Food Revolution
        </h2>
        <p className="text-lg">
          At Nutribot, we believe that food is not just about sustenance—it's
          about living your best life. Our AI-powered recipe generator is here
          to transform the way you think about meal planning. By focusing on
          specificity and personalization, Nutribot ensures that you not only
          eat well but also enjoy the journey of discovering new and exciting
          recipes tailored just for you.
        </p>
        <p className="text-lg mt-4 pb-20">
          Experience the future of cooking with{" "}
          <strong className="text-green-400">Nutribot</strong>—where technology
          meets taste, and every meal is a masterpiece. Dive in today and see
          how our cutting-edge platform can make your culinary dreams a reality!
        </p>
      </div>
      <div className="h-[200px]"></div>
    </>
  );
};

export default AboutPage;
