import express from 'express';

import {
  getOrders,
  getOrder,
  postOrder,
  deleteOrder,
} from '../controllers/orderController.js';

import {
  getTransactions,
  getTransaction,
  postTransaction,
  deleteTransaction,
} from '../controllers/transactionController.js';

import {
  getProducts,
  getProduct,
  postProduct,
  deleteProduct,
} from '../controllers/productController.js';

import {
  getUsers,
  getUser,
  postUser,
  deleteUser,
} from '../controllers/userController.js';

const router = new express.Router();

router.get('/order', getOrders);
router.get('/order/:id', getOrder);
router.post('/order', postOrder);
router.put('/order', postOrder);
router.delete('/order/:id', deleteOrder);

router.get('/transation', getTransactions);
router.get('/transaction/:id', getTransaction);
router.post('/transaction/:id', postTransaction);
router.delete('/transaction/:id', deleteTransaction);

router.get('/product', getProducts);
router.get('/product/:id', getProduct);
router.post('/product/:id', postProduct);
router.delete('/product/:id', deleteProduct);

router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.post('/user/:id', postUser);
router.delete('/user/:id', deleteUser);

export default router;
