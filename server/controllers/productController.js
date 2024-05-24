import Product from '../models/Product.js';

const getProduct = async (req, res) => {
  try {
    // get id through the parameter
    const { id } = req.params;

    // find the product
    const product = await Product.findById(id);

    // if the product exists, return it
    // else, return a message
    if (product) {
      // res.json is used since order is of type Object
      res.status(200).json(product);
    } else {
      res.status(200).json({ message: 'Product not found.' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  } res.send(product)
};

const getProducts = async (req, res) => {
  try {
    // initialize a filter object
    const filter = {};

    // get the status to be filtered through the query
    // eg:
    //   GET /product?name=talong
    //   GET /product -> this will return all products regardless of name
    const { name } = req.query;

    // if a name was requested, add it to the filter
    if (name) {
      filter.name = name;
    }

    console.log(name)

    // find the products based on the filter
    const products = await Product.find(filter);

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(200).json();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postProduct = async (req, res) => {
  try {
    const { name, description, type, price, stock, img } = req.body

    const newProduct = Product.create({ name, description, type, price, stock, img })

    if (newProduct) {
      res.status(200).json(newProduct);
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type, price, stock, img } = req.body;

    console.log(id);
    console.log(name, description, type, price, stock);
    // find the product using the id, and the new product
    const product = await Product.findByIdAndUpdate(id, { name, description, type, price, stock, img }, { new: true });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(200).json({ message: 'Product not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (product) {
      res.status(200).json({ product, message: 'successfully deleted product.' });
    } else {
      res.status(200).json({ message: 'Product not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
  deleteProduct,
};
