import express from 'express'
import {allOrders, checkout,userOrder,verify,checkoutCOD, updateOrderStatus} from '../Controller/payment.js'
import { Authenticated } from '../Middleware/auth.js'
const router = express.Router()


// initiate payment
router.post('/checkout',checkout)

// verify payment and save to db
router.post('/verify-payment',verify)

// to checkout if the user chooses cod 
router.post('/checkoutcod',checkoutCOD)
// user order
router.get('/userorder',Authenticated,userOrder)

// get all orders (for admin)
router.get('/allorders',allOrders)

router.put('/update-order-status', updateOrderStatus);


export default router;