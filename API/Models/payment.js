import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
 
  orderDate:{type:Date,default:Date.now}, payStatus:{type:String},
isClosed:{type:Boolean,default:false},
status:{type:String,default:'Placed'}
},{strict:false})

export const Payment = mongoose.model('Payment' , paymentSchema)