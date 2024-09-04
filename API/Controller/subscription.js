import { Subscription } from "../Models/subscriptions.js";
import { User } from "../Models/user.js";
export const addsubs=(async(req,res)=>{
  const {name,prompts,free_prompts,price}=req.body
  try {
     let user = await Subscription.create({name,prompts,free_prompts,price})
      res.json({message:"New Subscription Made",sucess:true})
  } catch (error) {
    res.json(error)
  }
})

export const subsPurchased=(async(req,res)=>{
  const userId = req.user;
  const {type,additional_prompts}=req.body
  try {
      let user = await User.findById(userId)
      if (!user) return res.json({message:"User Not Found ",sucess:false})
        user.total_prompts += additional_prompts;
       user.subscription_type = type;
       await user.save();
      res.json({message:"New Subscription Purchased ! ",sucess:true})
  } catch (error) {
    res.json(error)
  }
})

export const getAllsubs=(async(req,res)=>{
 
  try {
      let subs = await Subscription.find()
    
      res.json({message:"All subscriptions ",subs})
  } catch (error) {
    res.json(error)
  }
})
