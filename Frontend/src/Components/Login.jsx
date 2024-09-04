import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const Login = () => {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [googleMail, setGoogleMail] = useState();
  const [googleName, setGoogleName] = useState();
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const data = jwtDecode(credential);
      console.log("Decoded data:", data);

      setGoogleMail(data.email);
      setGoogleName(data.given_name);

      const response = await axios.post(
        "http://localhost:1000/api/user/google",
        {
          email: data.email,
          name: data.given_name,
        }
      );
      console.log(response.data);
      const { token } = await response.data;
      localStorage.setItem("token", token);
      setToken(token);
      console.log("Login successful with Google. Token:", token);
      navigate("/");

      // Handle successful login, e.g., storing token, redirecting, etc.
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
  };
  const { login } = useContext(AppContext);
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleLogin = async (event) => {
    event.preventDefault();
    const result = await login(userName, password);
    console.log(userName);
    console.log(password);
    setUsername("");
    setPassword("");
    console.log(result);
    if (result.sucess) {
      navigate("/");
    }
  };
  return (
    <form action="" onSubmit={handleLogin}>
      <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto flex justify-center align-middle place-items-center h-screen ">
        <div className="inner bg-gray-300  px-14 py-20 flex flex-col gap-y-6 rounded-2xl shadow-xl w-[450px] ">
          <h1 className="text-center font-bold text-3xl ">Login</h1>
          <input
            type="text"
            id="username"
            class=" bg-gray-200 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Username"
            required
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className=" bg-gray-200 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            Dont have an account ?{" "}
            <Link
              to={"/register"}
              className="text-blue-600 hover:text-blue-400"
            >
              Register Now
            </Link>
          </p>
          <button className="bg-green-400 y-300 hover:bg-green-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center ">
            Log In
          </button>
          <GoogleLogin
            width={"340px"}
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      </div>
    </form>
  );
};

export default Login;
