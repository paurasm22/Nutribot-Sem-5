import { User } from "../Models/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//register user
export const register=(async(req,res)=>{
  const {name,email,password}=req.body
  try {
    let user = await User.findOne({email})
    if (user){
      res.json({message:"User already exists ! ",sucess:false})
    }
    else{
      const hashPass =await bcrypt.hash(password,10) 
      user = await User.create({name,email,password:hashPass})
      res.json({message:"User registered Sucessfully",sucess:true})
    }

    
  } catch (error) {
    res.json("Error!!")
  }
})

//login user
export const login=async(req,res)=>{
  const {email,password} = req.body;
  try {
    let user = await User.findOne({email})
    if (!user) return res.json({message:"User not found !",sucess:false})
      const validpassword=await bcrypt.compare(password,user.password)
    if (!validpassword)return res.json({message:"Invalid Credentials",sucess:false})

      const token = jwt.sign({userId:user._id},"@#$$##%%",{
        expiresIn:'365d'
      })
      
      res.json({message:`Matched Credentials ${user.name}`,
        token,sucess:true
        ,admin:user.admin})
  } catch (error) {
    res.json({message:error.message})
  }
}

// to delete a user
export const deleteuser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found!", sucess: false });
    }

    await User.deleteOne({ email });
    res.json({ message: "User deleted successfully", sucess: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", sucess: false });
  }
};


//get all users 

export const user = async(req,res)=>{
  
  try {
    let users = await User.find().sort({createdAt:-1})
    res.json(users)
  } catch (error) {
    res.json(error.message)
  }
}
//get profile
export const profile = async (req,res)=>{
  res.json({user:req.user})
}


export const googleLogin = async (req, res) => {
  const { email, name } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user if not exists
      user = await User.create({
        name,
        email,
        password: '' // Not used for Google login
      });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, '@#$$##%%', { expiresIn: '365d' });

    res.json({
      message: `Welcome ${user.name}`,
      token,
      admin: user.admin
    });
  } catch (error) {
    res.status(400).json({ message: 'Error during Google login', error: error.message });
  }
};