import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';
import ErrorCard from "./components/ErrorCard";

import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductList from "./pages/admin/AdminProductList";
import UserManagement from "./pages/admin/UserManagement";
import SalesReport from "./pages/admin/SalesReport";
import Shop from "./pages/user/Shop";
import OrderFulfillment from "./pages/admin/OrderFulfillment";
import OrderManagement from "./pages/user/OrderManagement";

function App() {
  return (
    <div className="bg-white min-h-svh">
      <Router>
        <AuthProvider>
          < Routes >
            <Route path="*" element={<ErrorCard />} />
            {/* Login/Sign up routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* User routes */}
            <Route path="/user/shop" element={
              <ProtectedRoute allowedRoles={['user']}>
                <Shop />
              </ProtectedRoute>
            } />
            <Route path="/user/orders" element={
              <ProtectedRoute allowedRoles={['user']}>
                <OrderManagement />
              </ProtectedRoute>
            } />
            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/products" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminProductList />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <ProtectedRoute allowedRoles={['admin']}>
                < OrderFulfillment />
              </ProtectedRoute>
            } />
            <Route path="/admin/sales" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SalesReport />
              </ProtectedRoute>
            } />
          </Routes >
        </AuthProvider>
      </Router >
    </div >
  );
}

export default App;
