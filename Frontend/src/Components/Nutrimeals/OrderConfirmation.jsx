import React from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-[200px]">
      <div className="container flex justify-center m-auto align-middle flex-col items-center ">
        <img
          width="80"
          height="80"
          src="https://img.icons8.com/fluency/48/checkmark--v1.png"
          alt="checkmark--v1"
        />
        <h2 className="mt-6 font-bold text-3xl ">Order Placed !!</h2>
        <button
          onClick={() => navigate("/orderhistory")}
          className=" mt-4 bg-slate-300 px-3 py-2 font-bold hover:bg-slate-500"
        >
          Track your order{" "}
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
