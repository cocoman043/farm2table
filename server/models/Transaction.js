import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
