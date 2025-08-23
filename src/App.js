import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register'; // if you have this
import ForgotPassword from './features/auth/ForgotPassword'; // if you have this
import ResetPassword from './features/auth/ResetPassword';
// import ProductList from './features/products/ProductList';
import ProductDetail from './features/products/ProductDetail';
import CartPage from './features/cart/CartPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path= "/reset-password" element={<ResetPassword/>} />
        {/* <Route path= "/product" element={<ProductList/>} /> */}
        <Route path="/productDetails" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        {/* Optional: 404 fallback route */}
        <Route path="*" element={<h1 className="text-center mt-10 text-xl">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
