import mongoose from 'mongoose'

const productSchema  = new mongoose.Schema({
  brand:{type:String,require:true},
  title:{type:String,require:true},
  description:{type:String,require:true},
  price:{type:Number,require:true},
  category:{type:String,require:true},
  imgsrc:[ { type: String, require: true }],
  weight:{type:Number,require:true},
  calories:{type:Number,require:true},
  servingpp:{type:Number,require:true},
  isAmeal:{type:Boolean,require:true,default:false},
  isVeg:{type:Boolean,default:true},
  createdAt:{type:Date,default:Date.now},

})

export const Products = mongoose.model("Product",productSchema)