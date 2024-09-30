import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutCart = () => {
  const navigate = useNavigate();
  const {
    cart,
    getUserCart,
    decreaseCartqty,
    removeCartItem,
    addToCart,
    clearCart,
    userDetails,
    url,
    useraddress,
    getUserProfile,
    userData,
  } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state to prevent multiple submissions
  const [isUserDetailsLoaded, setIsUserDetailsLoaded] = useState(false);
  useEffect(() => {
    // Fetch cart and user profile when component mounts
    const fetchData = async () => {
      await getUserCart();
      await getUserProfile(); // Fetch user details
      setIsUserDetailsLoaded(true); // Set flag to true once user details are loaded
    };

    fetchData();
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
  }, [cart]); // Recalculate total quantity and price when cart changes

  const handlePayment = async () => {
    if (loading || !isUserDetailsLoaded) return; // Prevent further clicks if payment is in process
    setLoading(true); // Set loading state to true

    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: totalPrice,
        qty: qty,
        cartItems: cart?.items,
        userShipping: useraddress,
        userId: userData?.user?._id,
      });

      const { orderId, amount: orderAmount } = orderResponse.data;
      var options = {
        key: "rzp_test_IqWHz96pvX48FS", // Enter the Key ID generated from the Dashboard
        amount: orderAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Nutribot",
        description: "Pauras Web Project test transaction",
        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: userData?.user?._id,
            userShipping: useraddress,
          };
          try {
            const api = await axios.post(
              `${url}/payment/verify-payment`,
              paymentData
            );
            if (api.data.sucess) {
              await clearCart(); // Await the clearCart function to ensure the cart is cleared before navigating
              navigate("/orderconfirmation");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
          }
        },
        prefill: {
          name: "Pauras Web Project",
          email: "paurasmore22@gmail.com",
          contact: "0000000000",
        },
        notes: {
          address: "Mars",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };
  // console.log("User details in Checkoutlast page:", userDetails);
  return (
    <div className="mt-20 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
      <h1 className="text-center text-4xl font-bold mb-5">
        Confirm Order Items
      </h1>
      <div className="buttons flex justify-center items-center mb-4">
        <div className="quantity bg-slate-300 h-auto w-auto mr-3 flex justify-center items-center px-5 py-2">
          Total Quantity: <strong className="ml-1">{qty}</strong>
        </div>
        <div className="totalprice bg-slate-300 h-auto w-auto flex justify-center items-center px-5 py-2">
          Total Price: ₹ <strong className="ml-1">{totalPrice}</strong>
        </div>
      </div>
      {/* Delivery charge section */}
      <div className="delivery-charge bg-yellow-100 text-center p-4 rounded-lg shadow-md mb-5">
        <p className="font-bold text-lg text-gray-700">
          Free Delivery for orders above ₹150.
          {/* Playful message as orders are always above ₹150 */}
          <br /> No need to worry, you don't have orders below ₹150! 🎉
        </p>
      </div>
      {cart?.items?.map((item) => (
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
                <span className="material-symbols-outlined">
                  arrow_downward
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
                <span className="material-symbols-outlined">arrow_upward</span>
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
          className="clearall bg-red-600 hover:bg-red-400 text-white font-bold rounded inline-flex items-center px-4 py-2 cursor-pointer mr-9 md:mr-60"
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
          onClick={handlePayment}
        >
          Proceed to Payment
        </div>
      </div>
      <div className="div h-[300px]"></div>
    </div>
  );
};

export default CheckoutCart;
