const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Product = require('../../models/Product');
const insertBulk = require('../../utils/products');
const private_key = 'sshhh';

const router = express.Router();

function genrateToken(name,email){
  try {
    const token = jwt.sign({name,email},private_key);
    return token;
  } catch (error) {
      console.log(error);
    }
}

router.get('/',async (req,res)=>{
    try {
       res.send("Router running");
       res.end();
    } catch (error) {
        console.log(error)
    }
})

// Post - v1/api/login
router.post('/login',async (req,res)=>{
   try {
     const {email,password} = req.body;
     const user = await User.findOne({email});
     const compare = await bcrypt.compare(password,user.password);
     if(!compare){
        console.log(compare);
         return res.status(401).json({data:{},success:false,msg:'Invalid credentials'});
     }
        const response =  genrateToken(user.name,email);
        res.status(200).json({data:{name:user.name,email},token:response,success:'true'});
   } catch (error) {
       console.log(error);
   }
});

// Post - v1/api/signup
router.post('/signup',async (req,res)=>{

    const {name,email,password} = req.body;
    try {
        const isUserExist = await User.findOne({email});
        if(isUserExist){
          return res.status(201).json({data:{},msg:"user exist with this email id",success:false});
        }
        const hash = await bcrypt.hash(password,10);
        const newUser = new User({name,email,password:hash});
        newUser.save();
        
        const token = genrateToken(newUser.name,newUser.email);

       return res.status(201).json({data:{name,email},token,success:"true"});
    } catch (error) {
        console.log(error);
    }
});



// Products routes -c
router.get('/products',async (req,res)=>{
   try{ 
      const productsData = await Product.find();
      res.status(200).json({data:productsData,success:true});
   }catch(error){
     res.json({err:error});
   }
})

router.get('/product/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        console.log(id)
        const product = await Product.findById({_id:id});
        res.status(200).json({data:product,success:true});
    } catch (error) {
        res.json({err:error});
    }
});


router.get('/products/bestseller',async(req,res)=>{
    try {
        const data = await Product.find({bestseller:true});
         res.status(200).json({data,success:true});
    } catch (error) {
        
    }
})

router.post('/product/upload',async (req,res)=>{

})

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