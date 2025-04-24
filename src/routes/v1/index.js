const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Product = require('../../models/Product');
const private_key = 'sshhh';

const {login,signUp} = require('../../controllers/authController');
const { getAllProducts, getProductByID, bestSeller } = require('../../controllers/productController');
const {placeOrder,getUserOrders} = require('../../controllers/orderController');
const { addToCart, fetchCart, deletefromCart } = require('../../controllers/cartController');


const router = express.Router();

router.get('/',async (req,res)=>{
    try {
       res.send("Router running");
       res.end();
    } catch (error) {
        console.log(error)
    }
})

// Post - v1/api/login
router.post('/login',login);

// Post - v1/api/signup 
router.post('/signup',signUp);

// Products routes -c
router.get('/products',getAllProducts);

router.get('/product/:id',getProductByID);

router.get('/products/bestseller',bestSeller);

router.post('/product/upload',async (req,res)=>{

});

router.post('/place-order',placeOrder);
router.get('/get-orders/:id',getUserOrders);

router.post('/add-to-cart',addToCart);
router.get('/fetchcart/:id',fetchCart);
router.delete('/deletecart/:id',deletefromCart);

module.exports = router;


// {
//     "_id": "67df8d863ca88e40a01cd963",
//     "name": "Men Round Neck Pure Cotton T-shirt",
//     "description": "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//     "price": 120,
//     "image": [],
//     "category": "Men",
//     "subCategory": "Topwear",
//     "sizes": [],
//     "date": "2024-05-25T07:49:05.448Z",
//     "bestseller": false,
//     "__v": 0
//     },