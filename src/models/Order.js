const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        image: String,      
        quantity: Number,
        price: Number,
      }
    ],
    address : {
      firstName:String,
      LastName:String,
      email:String,
      street:String,
      state:String,
      city:String,
      zipCode:String,
      country:String
    },
    totalAmount: Number,
    orderStatus: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
  });
  
//   // Hook to auto-calculate totalAmount
//   orderSchema.pre('save', function(next) {
//     this.totalAmount = this.products.reduce((sum, item) => {
//       return sum + item.price * item.quantity;
//     }, 0);
//     next();
//   });
  
  const Order = mongoose.model('Order', orderSchema);
  