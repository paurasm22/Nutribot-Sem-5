import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = (props) => {
  const url = "http://localhost:1000/api";
  const [userData, setUserData] = useState();
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [recipe, setRecipe] = useState("");

  // handling token and auth
  useEffect(() => {
    const fetchToken = async () => {
      const lstoken = localStorage.getItem("token");
      console.log("Token from localStorage inside useEffect:", lstoken);
      if (lstoken) {
        setToken(lstoken);
        setIsAuthenticated(true);
        console.log("State updated with token:", lstoken);
        await fetchToken();
      }
    };
    fetchToken();
    getProducts();
  }, []);

  const login = async (userName, password) => {
    try {
      const response = await axios.post(
        `${url}/user/login`,
        { email: userName, password: password },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );

      const { admin, token } = await response.data;

      console.log("user Login", response.data);
      console.log("Is admin", response.data.admin);
      localStorage.setItem("admin", response.data.admin);
      setAdmin(response.data.admin);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);

      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const register = async (name, email, passwd) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password: passwd },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    console.log("User registered", api);
    return api.data;
  };

  const getUserProfile = async () => {
    // if (!token) return;
    try {
      const api = await axios.get(`${url}/user/profile`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      console.log(api.data);
      setUserData(api.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const getRecipe = async (
    timegiven,
    ingridientlist,
    healthstatus1,
    healthstatus2,
    healthstatuslist,
    cusine,
    specialcookinginst,
    type,
    prompt
  ) => {
    try {
      const api = await axios.post(
        `${url}/prompts/generate-recipe`,
        {
          timegiven,
          ingridientlist,
          healthstatus1,
          healthstatus2,
          healthstatuslist,
          cusine,
          specialcookinginst,
          type,
          prompt,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      return api;
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  };

  const [allsubs, setAllsubs] = useState([]);
  const getSubscriptions = async () => {
    if (!token) return;
    try {
      const api = await axios.get(`${url}/subs/allsubs`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      setAllsubs(api?.data?.subs);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const purchaseSubscription = async (plantype, total) => {
    try {
      const api = await axios.post(
        `${url}/subs/purchasesubscription`,
        {
          type: plantype,
          additional_prompts: total,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      console.log(api);
      return api.data;
    } catch (error) {
      console.error("Error purchasing subscription:", error);
    }
  };

  const recipeHistory = async () => {
    if (!token) return;
    try {
      const api = await axios.get(`${url}/prompts/getrecipes`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      return api.data.data;
    } catch (error) {
      console.error("Error fetching recipe history:", error);
    }
  };
  const [allProducts, setallProducts] = useState();
  const getProducts = async () => {
    try {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
          // Auth: token,
        },
        withCredentials: true,
      });
      console.log(api?.data?.products);
      setallProducts(api?.data?.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        login,
        isAuthenticated,
        token,
        admin,
        register,
        getUserProfile,
        userData,
        getRecipe,
        getSubscriptions,
        allsubs,
        purchaseSubscription,
        recipeHistory,
        url,
        setToken,
        allProducts,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
