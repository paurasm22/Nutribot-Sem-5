import { Address } from '../Models/address.js'

export const addAddress = async(req,res)=>{
  let {fullname,address,city,state,country,pincode,phoneNumber,timeOfDilevery} = req.body
  let userId = req.user;
  let userAddress  = await Address.create({userId,fullname,address,city,state,country,pincode,phoneNumber,timeOfDilevery})
  res.json({message:"Address Added !",userAddress , sucess:true})

}

export const getAddress = async (req,res)=>{
  let address = await Address.find({userId:req.user}).sort({createdAt:-1})
  res.json({message:'address',userAddress:address[0]})
}