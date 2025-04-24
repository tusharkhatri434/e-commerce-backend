const Product = require('../models/Product');

//'/products'
const getAllProducts = async (req,res)=>{
    try{ 
       const productsData = await Product.find();
       res.status(200).json({data:productsData,success:true});
    }catch(error){
      res.json({err:error});
    }
 };
 
 // '/product/:id'
 const getProductByID = async (req,res)=>{
     try {
         const id = req.params.id;
         console.log(id)
         const product = await Product.findById({_id:id});
         res.status(200).json({data:product,success:true});
     } catch (error) {
         res.json({err:error});
     }
 };
 
 // '/products/bestseller'
 const bestSeller = async(req,res)=>{
     try {
         const data = await Product.find({bestseller:true});
          res.status(200).json({data,success:true});
     } catch (error) {
         
     }
 };
 
 const uploadProduct = async (req,res)=>{
 
 };

 module.exports = {
    getAllProducts,
    getProductByID,
    bestSeller
 }