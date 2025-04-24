const Order = require('../models/Order');

const placeOrder = async (req,res)=>{
    const {user,products,address} = req.body;
    // console.log(req.body)
    let totalAmount = 0;
    const productArray = products.map((item)=>{
       const obj =  {
            product : item._id,
            name : item.name,
            image : item.image[0],
            quantity : item.count,
            price : item.price
          }
         totalAmount = totalAmount + (Number(item.price) * Number(item.count));
        return obj;
    })

    const orderData = {
        user: user._id,
        products: [...productArray],
        address,
        totalAmount,
      }
    
    // console.log(orderData);
    try {
        const newOrder = new Order(orderData);
        await newOrder.save();
        // console.log(newOrder);
        res.status(200).json({data:newOrder,success:true});

    } catch (error) {
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