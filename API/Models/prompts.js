import mongoose from 'mongoose'

const promptsSchema  = new mongoose.Schema({
  userId:{type:mongoose.Schema.ObjectId,ref:"User",require:true},
  timegiven:{type:String},
  ingridientlist:{type:String},
  healthstatus1:{type:String},
  healthstatus2:{type:String},
  // healthstatuslist:{type:String},
  healthstatuslist:{type:String},
  cusine:{type:String},
  specialcookinginst:{type:String},
  type:{type:String},
  prompts:[{
    prompt:{type:String,require:true},
    response:{type:String,require:true}
  }],
  createdAt:{type:Date,default:Date.now},

})

export const Prompt = mongoose.model("Prompt",promptsSchema)