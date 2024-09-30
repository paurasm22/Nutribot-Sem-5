import mongoose from 'mongoose'


const cartItemsSchema = new mongoose.Schema({
  productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product",require:true},
  title:{type:String,require:true},
  price:{type:Number,require:true},
  qty:{type:Number,require:true},
  imgsrc: { type: String, require: true },
})


const cartSchema  = new mongoose.Schema({
  userId:{type:mongoose.Schema.ObjectId,ref:"User",require:true},
  items:[cartItemsSchema],
  
})

export const Cart = mongoose.model("Cart",cartSchema)