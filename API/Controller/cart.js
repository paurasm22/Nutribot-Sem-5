import { Cart } from "../Models/cart.js";

//add to cart
export const addToCart = async(req,res)=>{
  const{productId,title,price,qty,imgsrc} = req.body;
  const userId = req.user
  let cart = await Cart.findOne({userId})
  if (!cart){
    //if user is new then create a new cart
    cart = new Cart({userId,items:[]})
  }
  const itemIndex = cart.items.findIndex((item)=>item.productId.toString()===productId)
  if (itemIndex>-1){
    // cart.items[itemIndex].qty+=qty;
    cart.items[itemIndex].qty+=1;
    cart.items[itemIndex].price+=price*qty;
  }
  else{
    
    cart.items.push({productId,title,price,qty,imgsrc})
  }

  await cart.save()
  res.json({message:"Items Added To Cart ! ",cart})
}

//user specific cart

export const userCart= async(req,res)=>{
   const userId = req.user
   let cart = await Cart.findOne({userId})
   if (!cart) return res.json({message:"Cart Not Found ! "})
    res.json({message:"User cart",cart})
}

//remove product from cart 
export const removeProductFromCart= async(req,res)=>{
  const productId = req.params.productId
  const userId = req.user
  let cart = await Cart.findOne({userId})
  if (!cart) return res.json({message:"Cart Not Found ! "})
  cart.items = cart.items.filter((item)=>item.productId.toString()!== productId)
  await cart.save()
   res.json({message:"Product Removed from cart",cart})
}


//clear cart 
export const clearCart= async(req,res)=>{
  
  const userId = req.user
  let cart = await Cart.findOne({userId})
  if (!cart){
    cart = new Cart({items:[]})
  }
  else{
    cart.items = [];
  }
  await cart.save()
   res.json({message:"Cart Cleared ! ",cart})
}

//decrease quantity 
export const decreaseProductQty = async (req, res) => {
  const { productId } = req.body; // Only productId needed
  const userId = req.user; // Assuming req.user contains the user ID

  try {
    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Find the item index
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      const item = cart.items[itemIndex];

      // Reduce quantity by 1
      if (item.qty > 1) {
        const pricePerUnit = item.price / item.qty;
        item.qty -= 1;
        item.price -= pricePerUnit;
      } else {
        // Remove item if quantity is 1
        cart.items.splice(itemIndex, 1);
      }

      await cart.save();
      return res.json({ message: "Item quantity decreased successfully" });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};