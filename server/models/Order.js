import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  status: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
