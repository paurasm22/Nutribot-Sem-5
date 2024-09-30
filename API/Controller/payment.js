import { Payment } from "../Models/payment.js";
import Razorpay from 'razorpay';
const razorpay = new Razorpay({ key_id: 'rzp_test_IqWHz96pvX48FS', key_secret: 'RG6zxZ6W2lvz8iY6aKJFRgav' });
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;
  const options = {
    amount: amount * 100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${Date.now()}`
  };
  const order = await razorpay.orders.create(options);

  res.json({ orderId: order.id, amount, cartItems, userShipping, userId, payStatus: "created" });
};
export const verify  = async(req,res)=>{
           
  const {orderId,paymentId,signature,amount,orderItems,userId,userShipping} = req.body
  let orderConfirm = await Payment.create(
   { orderId,paymentId,signature,amount,orderItems,userId,userShipping,payStatus:'paid'}
  )
  res.json({message:"payment sucessful" , sucess:true,orderConfirm})
}

export const checkoutCOD = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  // Create a new order with COD status
  const order = await Payment.create({
    amount,
    cartItems,
    userShipping,
    userId,
    payStatus: 'cod'  // Indicate Cash on Delivery
  });

  res.json({ orderId: order._id, amount, cartItems, userShipping, userId, payStatus: 'cod' });
};


// to get all orders
export const allOrders = async(req,res)=>{
 
  let orders = await Payment.find().sort({orderDate:-1})
  res.json(orders)
}

// user specific order
export const userOrder = async(req,res)=>{
  let userId = req.user._id.toString()
  let orders = await Payment.find({userId:userId}).sort({orderDate:-1})
  res.json(orders)
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body; 

    
    const updatedOrder = await Payment.findByIdAndUpdate(
      orderId,
      { status }, 
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};
