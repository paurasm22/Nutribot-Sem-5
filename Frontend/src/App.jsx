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
import ProtectedRoute from "./Components/ProtectedRoute"
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
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/time"
            element={
              <ProtectedRoute>
                <Timeinput />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ingridients"
            element={
              <ProtectedRoute>
                <Ingridients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/healthstatus"
            element={
              <ProtectedRoute>
                <HealthStatus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cookingstyle"
            element={
              <ProtectedRoute>
                <CookinsStyle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generatedRecipe"
            element={
              <ProtectedRoute>
                <GeneratedRecipe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <ProtectedRoute>
                <Subscriptions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipehistory"
            element={
              <ProtectedRoute>
                <RecipeHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderhistory"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipedetails/:recipe_id"
            element={
              <ProtectedRoute>
                <Recipedetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nutrimeals"
            element={
              <ProtectedRoute>
                <NutrimealsShow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <MealDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderconfirmation"
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminallorders"
            element={
              <ProtectedRoute>
                <AllOrdersAdmin />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
