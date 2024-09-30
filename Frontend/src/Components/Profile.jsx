import React, { useContext } from "react";
import AppContext from "../Context/AppContext";

const Profile = () => {
  const { userData } = useContext(AppContext);
  const containerHeight = `calc(100vh - 65px)`;
  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="flex justify-center items-center  m-auto h-[screen-20px] "
      style={{ height: containerHeight }}
    >
      <div className="inner bg-gray-300 py-8 px-4 rounded-xl  ">
        <p>
          <strong>Name:</strong> {userData.user.name}
        </p>
        <p>
          <strong>Email:</strong> {userData.user.email}
        </p>
        <p>
          <strong>Subscription Type:</strong> {userData.user.subscription_type}
        </p>
        <p>
          <strong>Total prompts:</strong> {userData.user.total_prompts}
        </p>
        <p>
          <strong>Total prompts used: </strong>
          {userData.user.used_prompts}
        </p>
      </div>
    </div>
  );
};

export default Profile;
