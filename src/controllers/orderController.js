const Order = require('../models/Order');

const placeOrder = async (req,res)=>{
    const {user,orderItems,address} = req.body;
    if(!user || !orderItems || !orderItems.length || !address){
      return res.json({success:false,msg:"Send valid or complete data"});
    } 
    let totalAmount = 0;
    const orderArray = orderItems.map((item)=>{
       const obj =  {
            product : item._id,
            name : item.name,
            image : item.image[0],
            quantity : item.count,
            price : item.price,
            size:item.size
          }
         totalAmount = totalAmount + (Number(item.price) * Number(item.count));
        return obj;
    })

    const orderData = {
        user:user._id,
        orderItems: orderArray,
        address,
        totalAmount,
      }
    
    try {
        const newOrder = new Order(orderData);
        await newOrder.save();
        res.status(200).json({data:newOrder,success:true});

    } catch (error) {
      console.log(error)
       res.json({success:false,err:error});
    }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({ user: userId });

    res.status(200).json({data:orders,success:true});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user orders',success:false, error });
  }
};
module.exports = {placeOrder,getUserOrders};