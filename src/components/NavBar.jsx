import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegHeart, FaPlus } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { GoSearch } from "react-icons/go";

const Navbar = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, cartCount, wishlistCount }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm" 
         style={{ backgroundColor: '#0b0c10', borderBottom: '1px solid #1f2833', padding: '12px 0' }}>
      <div className="container">
        
        {/* --- 1. LOGO --- */}
        <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center me-4" to="/">
          <span style={{ color: '#45a29e' }}>SHO</span><span className="text-white">FY</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          
          {/* --- 2. MAIN NAVIGATION --- */}
          <ul className="navbar-nav align-items-center me-auto">
            <li className="nav-item">
              <Link className="nav-link text-white px-3 fw-medium" to="/">Home</Link>
            </li>
            
            {/* ADDED PRODUCTS SECTION HERE */}
            <li className="nav-item">
              <Link className="nav-link text-white px-3 fw-medium" to="/products">Products</Link>
            </li>

            <li className="nav-item dropdown">
              <button className="btn btn-link nav-link text-white dropdown-toggle border-0" data-bs-toggle="dropdown">
                {selectedCategory === "All" ? "Categories" : selectedCategory}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark shadow border-0 mt-2">
                {["All", "Laptops", "Phones", "Tablets", "Gaming", "Accessories"].map(cat => (
                  <li key={cat}>
                    <button className="dropdown-item py-2" onClick={() => { setSelectedCategory(cat); navigate('/products'); }}>
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          {/* --- 3. SEARCH BAR (Centered & Wide) --- */}
          <div className="flex-grow-1 d-flex justify-content-center px-lg-4 my-3 my-lg-0">
            <form className="input-group" style={{ maxWidth: '400px' }} onSubmit={(e) => { e.preventDefault(); navigate('/products'); }}>
              <input 
                type="text" 
                className="form-control border-0 bg-dark text-white ps-3" 
                placeholder="Search for tech..." 
                style={{ height: '40px', fontSize: '0.9rem' }}
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary px-3" type="submit" style={{ backgroundColor: '#45a29e', border: 'none' }}>
                <GoSearch />
              </button>
            </form>
          </div>

          {/* --- 4. RIGHT ACTIONS --- */}
          <div className="d-flex align-items-center gap-3 ms-lg-3">
            <Link to="/addproducts" className="btn btn-outline-info btn-sm fw-bold px-3 rounded-pill d-none d-xl-flex align-items-center gap-2">
              <FaPlus size={10} /> Upload
            </Link>
            
            <Link to="/signin" className="nav-link fw-bold fw-medium text-white px-2 small">Log In</Link>
            <Link to="/signup" className="btn btn-primary btn-sm px-3 rounded-pill fw-bold" style={{ backgroundColor: '#45a29e', border: 'none' }}>Sign Up</Link>

            {/* Icons with Badge Alignment */}
            <div className="d-flex align-items-center gap-3 ms-2">
              <Link to="/wishlist" className="text-white position-relative">
                <FaRegHeart size={20} />
                {wishlistCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <Link to="/cart" className="text-white position-relative">
                <BsCart4 size={22} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info text-dark" style={{fontSize: '0.6rem'}}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;