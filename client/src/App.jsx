import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorCard from "./components/ErrorCard";

import Register from "./pages/Register";
import Login from "./pages/Login";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductList from "./pages/admin/AdminProductList";
import UserManagement from "./pages/admin/UserManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import SalesReport from "./pages/admin/SalesReport";
import Shop from "./pages/user/Shop";

function App() {
  return (
    <div className="bg-white min-h-svh">
      <Router>
        < Routes >
          <Route path="*" element={<ErrorCard />} />
          {/* Login/Sign up routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* User routes */}
          <Route path="/user/shop" element={<Shop />} />
          {/* Admin routes */}
          <Route path="/admin" element={< AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/sales" element={<SalesReport />} />
        </Routes >
      </Router >
    </div>
  );
}

export default App;
