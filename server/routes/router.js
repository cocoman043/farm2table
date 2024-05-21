import express from 'express';

import {
  getOrders,
  getOrder,
  postOrder,
  putOrder,
  deleteOrder,
} from '../controllers/orderController.js';

import {
  getTransactions,
  getTransaction,
  postTransaction,
  putTransaction,
  deleteTransaction,
} from '../controllers/transactionController.js';

import {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} from '../controllers/productController.js';

import {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/userController.js';

import {
  register,
  login,
} from '../controllers/authController.js';

const router = new express.Router();

router.get('/order', getOrders);
router.get('/order/:id', getOrder);
router.post('/order', postOrder);
router.put('/order/:id', putOrder);
router.delete('/order/:id', deleteOrder);

router.get('/transaction', getTransactions);
router.get('/transaction/:id', getTransaction);
router.post('/transaction', postTransaction);
router.put('/transaction/:id', putTransaction); // WARN: MIGHT NOT BE NEEDED
router.delete('/transaction/:id', deleteTransaction);

router.get('/product', getProducts);
router.get('/product/:id', getProduct);
router.post('/product', postProduct);
router.put('/product', putProduct); // WARN: MIGHT NOT BE NEEDED
router.delete('/product/:id', deleteProduct);

router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.post('/user', postUser);
router.put('/user/:id', putUser); // WARN: MIGHT NOT BE NEEDED
router.delete('/user/:id', deleteUser);

router.post("/register", register);
router.post("/login", login);

export default router;
