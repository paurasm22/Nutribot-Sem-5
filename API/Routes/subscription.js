import express from 'express'
import { addsubs, getAllsubs, subsPurchased } from '../Controller/subscription.js';
import { Authenticated } from '../Middleware/auth.js';
const Router = express.Router();
// to add a subscription
Router.post('/add',addsubs)

// after purchasing a subscription
Router.post('/purchasesubscription',Authenticated,subsPurchased)
Router.get('/allsubs',getAllsubs)
export default Router;