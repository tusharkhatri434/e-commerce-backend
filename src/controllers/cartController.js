const Cart = require('../models/Cart');

const addToCart = async(req,res)=>{
    try{
        const newItem = new Cart(req.body.cart);
        await newItem.save();
        return res.status(200).json({success:true,cartItem:newItem});
    }catch(err){
        return res.status(500).json({success:false,msg:"something went wrong",err});
    }
}

const fetchCart = async(req,res)=>{

    const userId = req.params.id;

    try {
        const cartItems = await Cart.findOne({user:userId});
        return res.status(200).json({success:true,data:cartItems});
    } catch (error) {
        return res.status(500).json({success:false,msg:"something went wrong"});
    }
}

const deletefromCart = async(req,res)=>{
    const cartId = req.params.id;
    const removeItemId = req.body.itemId;

    try {
        const result = await Cart.findOneAndUpdate(
            {_id:cartId},
            {
                $pull:{
                    items:{itemId:removeItemId}
                }
            },
            {new:true}
        );
        console.log(result);
        res.status(200).json({success:true,msg:"Item removed",data:result});   
        console.log(newData);
    } catch (error) {
        return res.status(500).json({success:true,msg:"something went wrong"});
    }
}

module.exports = {
    addToCart,fetchCart,deletefromCart
}