import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

// Component Imports
import Navbar from './components/NavBar';
import Home from './components/Home';
import GetProducts from './components/GetProducts';
import AddProducts from './components/AddProducts';
import Cart from './components/Cart';
import Wishlist from './components/WishList';
import Mpesa from './components/Mpesa';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

// ScrollToTop Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (indexToRemove) => setCart(cart.filter((_, i) => i !== indexToRemove));

  const toggleWishlist = (product) => {
    const exists = wishlist.find(item => item.product_name === product.product_name);
    if (exists) {
      setWishlist(wishlist.filter(item => item.product_name !== product.product_name));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <Router>
      <ScrollToTop /> {/* Reset scroll position on every page change */}
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
      />
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={
            <GetProducts 
              searchTerm={searchTerm} 
              selectedCategory={selectedCategory} 
              addToCart={addToCart} 
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          } />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mpesa" element={<Mpesa />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;