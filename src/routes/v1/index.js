const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Product = require('../../models/Product');
const insertBulk = require('../../utils/products');
const private_key = 'sshhh';

const router = express.Router();

async function genrateToken(name,email){
  try {
    const token = jwt.sign({name,email},private_key);
    console.log(token);
    return token;
  } catch (error) {
      console.log(error);
    }
}

router.get('/',async (req,res)=>{
    try {
       res.send("running");
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
     const compare = await bcrypt.compare(password,user?.password)
     if(compare){
        const response = await genrateToken(user.name,email);
        res.status(200).json({token:response,success:'true'});
    }
   } catch (error) {
       console.log(error);
   }
});

// Post - v1/api/signup
router.post('/signup',async (req,res)=>{

    const {name,email,password} = req.body;
    try {
        const hash = await bcrypt.hash(password,10);
        const newUser = new User({name,email,password:hash});
        newUser.save();
        // console.log(newUser);
        res.status(201).json({success:"true"});
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





module.exports = router;