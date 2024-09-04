import React, { useContext, useEffect, useState } from "react";
import nutibgremvoed from "../assets/nutibgremvoed.png";
import note from "../assets/note.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { getUserProfile, userData } = useContext(AppContext);
  const [precentage, setPercentage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Call getUserProfile when the component mounts
    getUserProfile();
  }, []); // Include getUserProfile in dependency array

  useEffect(() => {
    console.log("User data in MainPage:", userData);
    if (userData?.user) {
      const percent =
        (userData?.user?.used_prompts / userData?.user?.total_prompts) * 100;
      setPercentage(percent || 0);
    }
  }, [userData]); // Update percentage when userData changes

  return (
    <div>
      <div className="outer sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto flex flex-col align-middle items-center gap-15 md:grid grid-cols-2 md:mt-[40px] ">
        <div className="log1 md:grid md:place-content-center cursor-pointer ">
          <img
            src={nutibgremvoed}
            alt=""
            className="h-[250px] w-[250px] mt-10 md:h-[400px] md:w-[400px]"
          />
        </div>
        <div className="textandprogress  md:flex-col md:justify-center md:items-center  md:grid md:place-content-center">
          <div className="progressbar">
            <ProgressBar
              variant="warning"
              now={precentage}
              label={
                <span
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >{`${userData?.user?.used_prompts} / ${userData?.user?.total_prompts}`}</span>
              }
              className="w-[350px] m-auto h-[40px] md:w-[500px] border-2 border-black"
            />
          </div>
          <div className="text flex justify-center flex-col">
            <h3 className="text-center mt-8 text-3xl font-bold md:text-4xl ">
              Generate a new Recipe now !
            </h3>
            <div className="buttonsss flex flex-col md:flex-row">
              <Button
                onClick={() => navigate("/time")}
                variant="success"
                className="mt-8 md:w-[200px] w-40 mx-auto  md:grid shadow-2xl "
              >
                Generate Recipe
              </Button>{" "}
              <Button
                onClick={() => navigate("/subscriptions")}
                variant="warning"
                className="mt-8 md:w-[200px] w-40 mx-auto  md:grid shadow-2xl hover:bg-yellow-600 "
              >
                See Plans
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="note flex justify-center  flex-col items-center sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto ">
        <img
          src={note}
          alt="warning_logo"
          className="h-[150px] w-[150px] mt-12 "
        />
        <p className="bg-red-400 p-11 rounded-xl text-center text-2xl text-white shadow-xl  border-2 border-gray-600">
          🌟 The recipes generated by Nutribot are customized based on the
          information you provide. To get the best results, please make sure
          your inputs are accurate and relevant to your needs. Remember, a
          well-chosen input leads to a delicious and satisfying recipe! 🍽️
          Choose wisely and enjoy your culinary adventure!
        </p>
        <div className="h-[200px]"></div>
      </div>
    </div>
  );
};

export default MainPage;
