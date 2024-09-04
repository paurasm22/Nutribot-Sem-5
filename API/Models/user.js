import mongoose from 'mongoose'

const userSchema  = new mongoose.Schema({
  name:{type:String,require:true},
  email:{type:String,require:true},
  password:{type:String,require:true},
  createdAt:{type:Date,default:Date.now},
  admin:{type:Boolean,default:false},
  total_prompts:{type:Number,default:5},
  used_prompts:{type:Number,default:0},
  subscription_type:{type:String,default:'free'}

})

export const User = mongoose.model("User",userSchema)