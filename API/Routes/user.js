import express from 'express'
import { deleteuser, googleLogin, login, profile, register, user } from "../Controller/user.js"
import { Authenticated } from '../Middleware/auth.js';

const Router = express.Router();
//register user 
Router.post('/register',register)//=>/api/user/register
//login user
Router.post('/login',login)

//get all user 
Router.get('/all',user)
// to delete a user
Router.delete('/delete',deleteuser)
// to handle googleAuth
Router.post('/google',googleLogin)
//get user profile
Router.get('/profile',Authenticated,profile)
export default Router;