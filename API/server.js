import express from 'express'
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import userRouter from "./Routes/user.js"
import subsRouter from "./Routes/subscription.js"
import productRouter from "./Routes/product.js"
import cartRouter from "./Routes/cart.js"
import addressRouter from "./Routes/address.js"
import promptsRouter from "./Routes/prompts.js"
import paymentRouter from './Routes/payment.js'
const app = express()
dotenv.config()
const PORT = process.env.PORT
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin:'http://localhost:5173',
  methods:["GET","POST","PUT","DELETE","PATCH"],
  credentials:true
}))


//user Router
app.use('/api/user',userRouter)
// subscription router
app.use('/api/subs',subsRouter)
// product router
app.use('/api/product',productRouter)
//cart router
app.use('/api/cart',cartRouter)
//address router
app.use('/api/address',addressRouter)
// prompts router
app.use('/api/prompts',promptsRouter)

// payment router
app.use('/api/payment',paymentRouter)
mongoose.connect("mongodb+srv://paurasmore22:FceTTlbqxO7vmKXz@nutribot.zchqk.mongodb.net/",{
  dbName:"Nutibot"
}).then(()=>{
  console.log("Connected Sucessfully !")
})



app.listen(PORT,()=>{
  console.log(`Listening on Port ${PORT}`)
})