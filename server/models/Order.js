import mongoose from 'mongoose';

// status: pending, confirmed, cancelled
const OrderSchema = new mongoose.Schema({
  status: { type: String, default: 'pending' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

export default Order;
