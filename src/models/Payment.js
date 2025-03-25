const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['Card', 'PayPal', 'COD', 'UPI'],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending'
    },
    paymentId: { type: String }, // optional, from payment gateway
    paidAt: { type: Date }
  });
  
module.exports = mongoose.model('Payment', paymentSchema);
  