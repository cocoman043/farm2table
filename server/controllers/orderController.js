import Order from '../models/Order.js';

// GET /order/:id
// Returns one order, based on id
const getOrder = async (req, res) => {
  try {

    // get id trough the parameter
    const { id } = req.params;

    // find the order
    const order = await Order.findById(id);

    // if the order exists, return it
    // else, return a message
    if (order) {
      // res.json is used since order is of type Object
      res.status(200).json(order);
    } else {
      res.status(200).json({ message: 'Order not found.' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /order
// Return multiple orders, can be filtered by status
const getOrders = async (req, res) => {
  try {
    // initialize a filter object
    const filter = {};

    // get the status to be filtered through the query
    // eg:
    //   GET /order?status=pending
    //   GET /order?status=confirmed
    //   GET /order?status=cancelled
    //   GET /order -> this will return all orders regardless of status
    const { status } = req.query;

    // if a status was requested, add it to the filter
    if (status) {
      filter.status = status;
    }

    console.log(filter)

    // find the orders based on the filter, ordered by status (descending kaya may -1)
    const orders = await Order.find(filter).sort({ status: -1 });

    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(200).json();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /order
// Create a new order
// TODO: test after user schema and controllers have been implemented
const postOrder = async (req, res) => {
  try {
    // get the user_id from the body
    //
    // if you're using fetch:
    //
    // fetch('http://localhost:3000/order', {
    // credentials: 'include',
    //  method: 'POST',
    //  headers: {
    //    'Content-Type': 'application/json'
    //  },
    //  body: JSON.stringify({ user_id })
    // });
    //
    // or if you're using axios:
    //
    // axios.post('http://localhost:3000/order', {
    //  user_id
    // }, { withCredentials: true })
    const { user_id } = req.body;

    // instead of creating a new order using `new Order`, and then saving with order.save(),
    // Order.create does both in one line
    const order = await Order.create({ user_id });

    if (order) {
      // TODO: check the responce if order is returned
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

// PUT /order
const putOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // find the order using the id, and the new status
    // use {new:true} option to return the updated order instead of the old
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(200).json({ message: 'Order not found.' });
    }
  } catch (error) {

  }
};

// DELETE /order/:id
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);


    if (order) {
      res.status(200).json({ order, message: 'successfully deleted order.' });
    } else {
      res.status(200).json({ message: 'failed to find order.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getOrder,
  getOrders,
  postOrder,
  putOrder,
  deleteOrder,
};
