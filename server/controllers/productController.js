// import Product from '../models/Product.js';

const getProduct = async (req, res) => {
  const product = await Product.findOne({ code: req.query.name })
  res.send(product)
};

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.send(products)
};

const postProduct = async (req, res) => {
  const { name, desciption, type, price, stock } = req.body

  const newProduct = new Product({ name, desciption, type, price, stock })

  const result = await newProduct.save()

  if (result._id) {
    res.send({ success: true })
  } else {
    res.send({ success: false })
  }
};

const putProduct = async (req, res) => {
  const [prevProduct, newProduct] = req.body

  const result = Product.findOneAndUpdate(
    prevProduct,
    newProduct
  );

  if (result._id) {
    res.send({ success: true })
  } else {
    res.send({ success: false })
  }
};

const deleteProduct = async (req, res) => {
  const { name } = req.body

  const result = await Subject.deleteOne({ name })

  if (result.deletedCount == 1) {
    res.send({ success: true })
  } else {
    res.send({ success: false })
  }
};

export {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
  deleteProduct,
};
