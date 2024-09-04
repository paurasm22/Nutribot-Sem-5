import mongoose from 'mongoose'

const subsSchema  = new mongoose.Schema({
  name:{type:String,require:true},
  prompts:{type:Number,require:true},
  free_prompts:{type:Number,require:true},
  price:{type:Number,require:true}

})

export const Subscription = mongoose.model("Subscription",subsSchema)