const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true // One cart per user
  },
  items: [
    {
      itemId:{
        type:String,
        default:Date.now()
      },
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      name: String, // Optional: stored for quick access
      image: String,
      size: {
        type: String, 
        enum: ['S', 'M', 'L', 'XL', 'XXL'] 
      },
      quantity: { 
        type: Number, 
        default: 1, 
        min: 1 
      },
      price: Number // Price at the time of adding to cart
    }
  ],
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
