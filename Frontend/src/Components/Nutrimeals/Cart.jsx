import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const {
    getUserCart,
    decreaseCartqty,
    removeCartItem,
    addToCart,
    clearCart,
    cart,
  } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getUserCart();
  }, []);
  useEffect(() => {
    if (cart?.items?.length) {
      let totalQty = 0;
      let totalCost = 0;
      cart.items.forEach((item) => {
        totalQty += item.qty;
        totalCost += item.price * item.qty; // Multiply price by qty
      });
      setQty(totalQty);
      setTotalPrice(totalCost);
    } else {
      setQty(0);
      setTotalPrice(0);
    }
  }, [cart]);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex text-center justify-center mt-40 h-screen font-extrabold text-6xl">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="mt-20 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
      {/* Display Total Quantity and Price */}
      <div className="buttons flex justify-center items-center mb-4">
        <div className="quantity bg-slate-300 h-auto w-auto mr-3 flex justify-center items-center px-5 py-2">
          Total Quantity: <strong className="ml-1">{qty}</strong>
        </div>
        <div className="totalprice bg-slate-300 h-auto w-auto flex justify-center items-center px-5 py-2">
          Total Price: ₹ <strong className="ml-1">{totalPrice}</strong>
        </div>
      </div>

      {/* Display Cart Items */}
      {cart.items.map((item) => (
        <div
          key={item.productId}
          className="inner bg-slate-300 h-auto flex flex-col align-middle items-center gap-2 py-4 mt-8 md:grid md:grid-cols-3 cursor-pointer"
        >
          <img
            src={item?.imgsrc}
            alt={item.title}
            className="h-[150px] w-[200px] border-black border-2 md:ml-5 cursor-pointer"
            onClick={() => navigate(`/product/${item.productId}`)}
          />
          <div
            className="title font-bold text-2xl flex flex-col items-center text-gray-700 text-center"
            onClick={() => navigate(`/product/${item.productId}`)}
          >
            {item.title}
            <div className="title font-extrabold text-xl text-gray-700">
              ₹ <strong>{item.price}</strong>
            </div>
          </div>
          <div className="buttonsgroups flex justify-center items-center gap-x-3 flex-col">
            <div className="incdrc flex gap-3 mb-3">
              <button
                className="bg-red-600 hover:bg-red-400 text-white font-bold rounded inline-flex items-center px-2 py-1 cursor-pointer"
                onClick={() => decreaseCartqty(item.productId)}
              >
                <span className="flex align-middle justify-center min-w-3">
                  -
                </span>
              </button>
              <div className="qtyprice">{item.qty}</div>
              <button
                className="bg-green-400 hover:bg-green-300 text-gray-800 font-bold rounded inline-flex items-center px-2 py-1 cursor-pointer"
                onClick={() =>
                  addToCart(
                    item?.productId,
                    item?.title,
                    item?.price,
                    item?.qty,
                    item?.imgsrc
                  )
                }
              >
                <span className="flex align-middle justify-center min-w-3">
                  +
                </span>
              </button>
            </div>
            <div className="remove">
              <button
                className="bg-red-600 hover:bg-red-400 text-white font-bold rounded inline-flex items-center px-2 py-1 cursor-pointer"
                onClick={() => removeCartItem(item.productId)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="clearallcheckout flex justify-center items-center mt-3">
        <div
          className="clearall bg-red-600 hover:bg-red-400 text-white font-bold rounded inline-flex items-center px-4 py-2  cursor-pointer mr-9 md:mr-60"
          onClick={() => {
            if (confirm("Clear Cart? All the items will be deleted")) {
              clearCart();
            }
          }}
        >
          Clear Cart
        </div>
        <div
          className="checkout bg-green-400 hover:bg-green-300 text-gray-800 font-bold rounded inline-flex items-center px-4 py-2 cursor-pointer"
          onClick={() => navigate(`/shipping`)}
        >
          Checkout
        </div>
      </div>
      <div className="div h-[300px]"></div>
    </div>
  );
};

export default Cart;
