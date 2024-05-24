import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  img: {type: String, default: ''}
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
