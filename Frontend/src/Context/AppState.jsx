import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

const AppState = (props) => {
  const url = "http://localhost:1000/api";
  const [userData, setUserData] = useState();
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [userDetails, setuserDetails] = useState();

  // handling token and auth
  useEffect(() => {
    const fetchToken = async () => {
      const lstoken = localStorage.getItem("token");
      const isauth = localStorage.getItem("IsAuthenticated");
      // console.log("Token from localStorage inside useEffect:", lstoken);
      if (lstoken) {
        setToken(lstoken);
        // setIsAuthenticated(true);
        // No recursive call here
      }
    };

    fetchToken();
    // userProfile();
    // getUserCart();
    getProducts();
    getUserProfile();
    getAddress();
    // fetchOrders();
    // getAllOrders();
  }, []);

  // useEffect(() => {
  //   if (token) {
  //     getProducts();
  //     getUserCart();
  //     userProfile();
  //     getAddress();
  //   }
  // }, [token]);

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
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log("Is admin", response.data.admin);
      localStorage.setItem("admin", response.data.admin);
      setAdmin(response.data.admin);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      localStorage.setItem("IsAuthenticated", true);

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
      // console.log(api.data);
      setUserData(api?.data);
      console.log("User details in appstate ", userData);
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
      // console.log(api);
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
      // console.log(api?.data?.products);
      setallProducts(api?.data?.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  // Initialize with null or an empty object
  const [cart, setCart] = useState();
  const getUserCart = async () => {
    try {
      const api = await axios.get(`${url}/cart/user`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      // console.log("Cart of the user", api?.data?.cart);
      setCart(api?.data?.cart);
      // return api?.data?.cart;
      // setCart(api?.data?.cart); // Set the entire cart object, not just items
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty: 1, imgsrc: imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log("My Cart", api);
    toast.success(api?.data?.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  // useEffect(() => {
  //   getUserCart();
  // }, [addToCart]);
  //decrease qty;
  const decreaseCartqty = async (productId) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );

    setCart(api.data.cart);
    // console.log("USer cart", api.data.cart);
  };
  // to remove a product
  const removeCartItem = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    toast.error("Item removed from Cart !", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  // clear user cart
  const clearCart = async (prouctId) => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    toast.error("Cart cleared ! ", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    // setCart(api.data.cart);
    // console.log("USer cart", api.data.cart);
  };
  const [useraddress, setUserAddress] = useState("");
  // get recent user address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setUserAddress(api?.data?.userAddress);
    // console.log(api?.data?.userAddress);
  };

  const shippingAddress = async (
    fullname,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
    time
  ) => {
    const api = await axios.post(
      `${url}/address/add`,

      {
        fullname,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber,
        timeOfDilevery: time,
      },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setCart(api.data.cart);

    return api;
    // console.log("USer cart", api.data.cart);
  };

  // const userProfile = async () => {
  //   const api = await axios.get(`${url}/user/profile`, {
  //     headers: {
  //       "Content-Type": "Application/json",
  //       Auth: token,
  //     },
  //     withCredentials: true,
  //   });
  //   console.log("User details are : ", api.data.user);
  //   setuserDetails(api.data.user);
  // };
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/payment/userorder`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      console.log("User orders", response.data);
      // setOrders(response.data);
      return response.data; // Log the data to check the response format
      // setOrders(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // Default to an empty array in case of error
    }
  };
  // useEffect(() => {
  //   fetchOrders();
  // }, []);

  const getAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/payment/allorders`, {
        headers: {
          "Content-Type": "Application/json",
          // Auth: token,
        },
        withCredentials: true,
      });
      console.log("User orders for admin ", response.data);
      // setOrders(response.data);
      return response.data; // Log the data to check the response format
      // setOrders(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Default to an empty array in case of error
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
        cart,
        getUserCart,
        addToCart,
        decreaseCartqty,
        removeCartItem,
        clearCart,
        useraddress,
        getAddress,
        shippingAddress,
        userDetails,

        fetchOrders,
        getAllOrders,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
