import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AppContext from "../../Context/AppContext";

const AllOrdersAdmin = () => {
  const { getAllOrders, url } = useContext(AppContext);
  const [admorders, setAdmorders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllOrders();
      setAdmorders(data);
      console.log("From All orders page", data);
    };
    fetchData();
  }, [getAllOrders]);

  // Axios call to update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${url}/payment/update-order-status`, {
        orderId,
        status: newStatus,
      });

      // Refetch the updated orders after status change
      const updatedOrders = await getAllOrders();
      setAdmorders(updatedOrders);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">All Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {admorders.length > 0 ? (
          admorders.map((order) => (
            <div
              key={order._id}
              className={`p-4 border rounded-lg shadow-md ${
                order.status !== "Out for Delivery" ? "bg-red-200" : "bg-white"
              }`}
            >
              <h2 className="text-xl font-bold">Order ID: {order.orderId}</h2>
              <p>Status: {order.status}</p>
              <p>Payment Status: {order.payStatus}</p>
              <p>Is Closed: {order.isClosed ? "Yes" : "No"}</p>
              <p>
                Order Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p>Customer: {order.userShipping?.fullname}</p>
              <p>
                Address: {order.userShipping?.address},{" "}
                {order.userShipping?.city}
              </p>
              <p>Amount: ₹{order.amount}</p>

              <div className="mt-2">
                <label className="block text-sm font-medium">
                  Update Status:
                </label>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="w-full border rounded p-2 mt-3"
                >
                  <option value="Placed">Placed</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                </select>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Ordered Items</h3>
                <ul className="space-y-4">
                  {order.orderItems?.map((item) => (
                    <li key={item._id} className="flex items-center space-x-4">
                      <img
                        src={item.imgsrc}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-bold">{item.title}</p>
                        <p>Qty: {item.qty}</p>
                        <p>Price: ₹{item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AllOrdersAdmin;
