const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const private_key = 'sshhh';


function generateToken(name,email){
  try {
    const token = jwt.sign({name,email},private_key);
    return token;
  } catch (error) {
      console.log(error);
    }
}


// Post - v1/api/login
const login = async (req,res)=>{
    try {
      const {email,password} = req.body;
      const user = await User.findOne({email});
      const compare = await bcrypt.compare(password,user.password);
      if(!compare){
         console.log(compare);
          return res.status(401).json({success:false,msg:'Invalid credentials'});
      }
         const response =  generateToken(user.name,email);
         res.status(200).json({user:{name:user.name,email},token:response,success:'true'});
    } catch (error) {
        console.log(error);
    }
};

// Post - v1/api/signup 
const signUp = async (req,res)=>{

    const {name,email,password} = req.body;
    try {
        const isUserExist = await User.findOne({email});
        if(isUserExist){
          return res.status(201).json({msg:"user exist with this email id",success:false});
        }
        const hash = await bcrypt.hash(password,10);
        const newUser = new User({name,email,password:hash});
        newUser.save();
        
        const token = generateToken(newUser.name,newUser.email);

       return res.status(201).json({user:{name,email},token,success:"true"});
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    login,signUp
}