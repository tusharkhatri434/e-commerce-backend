const mongoose = require('mongoose');

//  _id: "aaaaa",
//         name: "Women Round Neck Cotton Top",
//         description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
//         price: 100,
//         image: [p_img1],
//         category: "Women",
//         subCategory: "Topwear",
//         sizes: ["S", "M", "L"],
//         date: 1716634345448,
//         bestseller: true

const productSchema = new mongoose.Schema({
    name:{ type:String, required:true},
    description:String,
    price:Number,
    image:[String],
    category:{
        type:String
    },
    subCategory: {
        type:String 
    },
    sizes: [{
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL']}],
    date:{type:Date},
    bestseller:{type:Boolean}
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;