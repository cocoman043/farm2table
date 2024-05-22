import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorCard from "./components/ErrorCard";
import Table from "./components/Table";
import ManageOrders from "./pages/ManageOrders";
import TransactionCard from "./components/Transaction";

import Register from "./pages/Register";
import Login from "./pages/Login";

import Shop from "./pages/user/Shop";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductList from "./pages/admin/AdminProductList";
import UserManagement from "./pages/admin/UserManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import SalesReport from "./pages/admin/SalesReport";

function App() {
  return (
    <>
      <div className="flex from-sky-500 to-indigo-500 p-8 w-screen justify-center h-screen items-center">
        <Router>
          <Routes>
            <Route path="*" element={<ErrorCard />} />
            {/* Login/Sign up routes */}
            <Route path="/register" component={<Register />} />
            <Route path="/login" component={<Login />} />
            {/* User routes */}
            <Route path="/user/shop" element={<Shop />} />
            {/* Admin routes */}
            <Route path="/admin" component={< AdminDashboard />} />
            <Route path="/admin/products" component={<AdminProductList />} />
            <Route path="/admin/users" component={<UserManagement />} />
            <Route path="/admin/orders" component={<OrderManagement />} />
            <Route path="/admin/sales" component={<SalesReport />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
