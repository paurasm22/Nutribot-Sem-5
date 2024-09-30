import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppContext from "./Context/AppContext";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LandingNavbar from "./Components/LandingNavbar";
import LangingPage from "./Components/LangingPage";
import Signup from "./Components/Login";
import Register from "./Components/Register";
import Login from "./Components/Login";
import MainPage from "./Components/MainPage";
import Navbar from "./Components/Navbar";
import Timeinput from "./Components/Timeinput";
import Ingridients from "./Components/Ingridients";
import HealthStatus from "./Components/HealthStatus";
import CookinsStyle from "./Components/CookinsStyle";
import GeneratedRecipe from "./Components/GeneratedRecipe";
import Subscriptions from "./Components/Subscriptions";
import RecipeHistory from "./Components/RecipeHistory";
import OrderHistory from "./Components/OrderHistory";
import Profile from "./Components/Profile";
import Recipedetails from "./Components/Recipedetails";
import NutrimealsShow from "./Components/Nutrimeals/NutrimealsShow";
import MealDetails from "./Components/Nutrimeals/MealDetails";
import Cart from "./Components/Nutrimeals/Cart";
import Shipping from "./Components/Nutrimeals/Shipping";
import Checkout from "./Components/Nutrimeals/Checkout";
import OrderConfirmation from "./Components/Nutrimeals/OrderConfirmation";
import AllOrdersAdmin from "./Components/Admin/AllOrdersAdmin";
import AboutPage from "./Components/AboutPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <LandingNavbar />
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/landingpage" element={<LangingPage />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" index element={<Login />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/time" element={<Timeinput />} />
          <Route path="/ingridients" element={<Ingridients />} />
          <Route path="/healthstatus" element={<HealthStatus />} />
          <Route path="/cookingstyle" element={<CookinsStyle />} />
          <Route path="/generatedRecipe" element={<GeneratedRecipe />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/recipehistory" element={<RecipeHistory />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipedetails/:recipe_id" element={<Recipedetails />} />
          <Route path="/nutrimeals" element={<NutrimealsShow />} />
          <Route path="/product/:id" element={<MealDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderconfirmation" element={<OrderConfirmation />} />
          <Route path="/adminallorders" element={<AllOrdersAdmin />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
