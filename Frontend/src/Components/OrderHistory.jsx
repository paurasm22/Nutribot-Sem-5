import React, { useState, useEffect, useContext } from "react";
import AppContext from "../Context/AppContext";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { fetchOrders } = useContext(AppContext);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchOrders();
      setOrders(data);
    };

    fetch(); // Invoke the async function
  }, [fetchOrders]);

  // Function to extract date portion from the date string
  const extractDate = (dateString) => {
    if (!dateString) {
      return "Date not available"; // Handle cases where dateString might be undefined or null
    }
    const parts = dateString.split("T");
    return parts.length > 1 ? parts[0] : dateString;
  };

  return (
    <div className="container mx-auto p-4 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
      <h2 className="mt-5 text-5xl font-bold text-center mb-5">
        Order History
      </h2>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-lg bg-white"
            >
              <p className="text-lg font-semibold mb-2">
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="text-gray-600">
                <strong>Payment Status:</strong>{" "}
                {order.payStatus === "paid" ? (
                  <span className="text-green-600 font-bold">Paid</span>
                ) : (
                  <span className="text-red-600 font-bold">Unpaid</span>
                )}
              </p>
              <p className="text-gray-600">
                <strong>Closed:</strong> {order.isClosed ? "Yes" : "No"}
              </p>
              <p className="text-gray-600">
                <strong>Order Date:</strong> {extractDate(order?.orderDate)}
              </p>
              <p className="text-gray-600">
                <strong>Amount:</strong> ₹ {order.amount}
              </p>
              <p className="text-gray-600">
                <strong>Payment ID:</strong> {order.paymentId}
              </p>

              {/* Items */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Items</h3>
                <ul className="space-y-4">
                  {order.orderItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center space-x-4 border-b pb-2"
                    >
                      <img
                        src={item.imgsrc}
                        alt={item.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-gray-600">Quantity: {item.qty}</p>
                        <p className="text-gray-600">Price: ₹{item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No orders found</p>
      )}
    </div>
  );
};

export default OrderHistory;
