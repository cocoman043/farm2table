import Transaction from '../models/Transaction.js';

const getTransaction = async (req, res) => {
  try {

    // get id trough the parameter
    const { id } = req.params;

    // find the transaction
    const transaction = await Transaction.findById(id);

    // if the transaction exists, return it
    // else, return a message
    if (transaction) {
      // res.json is used since transaction is of type Object
      res.status(200).json(transaction);
    } else {
      res.status(200).json({ message: 'Order not found.' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    // initialize a filter object
    const filter = {};

    // get the status to be filtered through the query
    // eg:
    //   GET /transaction?product_id=129371238712
    //   GET /transaction?order_id=13127938712831
    //   GET /transaction -> this will return all transactions regardless of status
    const { product_id, order_id } = req.query;

    // if a product_id or order_id was requested, add it to the filter
    if (product_id) filter.product_id = product_id;
    if (order_id) filter.order_id = order_id;

    console.log(filter)

    // find the transactions based on the filter
    const transactions = await Transaction.find(filter);

    if (transactions) {
      res.status(200).json(transactions);
    } else {
      res.status(200).json();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postTransaction = async (req, res) => {
  try {
    // get the product_id and order_id from the body
    //
    // if you're using fetch:
    //
    // fetch('http://localhost:3000/transaction', {
    // credentials: 'include',
    //  method: 'POST',
    //  headers: {
    //    'Content-Type': 'application/json'
    //  },
    //  body: JSON.stringify({ product_id, order_id })
    // });
    //
    // or if you're using axios:
    //
    // axios.post('http://localhost:3000/transaction', {
    //  product_id,
    //  order_id
    // }, { withCredentials: true })
    const { product_id, quantity, order_id } = req.body;

    // instead of creating a new transaction using `new Order`, and then saving with order.save(),
    // transaction.create does both in one line
    const transaction = await Transaction.create({ product_id, quantity, order_id });

    if (transaction) {
      // TODO: check the response if transaction is returned
      res.status(200).json(transaction);
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

// WARN: this endpoint may not be used since we might not need to update transactions
const putTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // find the transaction using the id, and the new status
    // use {new:true} option to return the updated transaction instead of the old
    const transaction = await Transaction.findByIdAndUpdate(id, { quantity }, { new: true });

    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(200).json({ message: 'transaction not found.' });
    }
  } catch (error) {

  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);

    if (transaction) {
      res.status(200).json({ transaction, message: 'successfully deleted transaction.' });
    } else {
      res.status(200).json({ message: 'failed to find transaction.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getTransaction,
  getTransactions,
  postTransaction,
  putTransaction,
  deleteTransaction,
};
