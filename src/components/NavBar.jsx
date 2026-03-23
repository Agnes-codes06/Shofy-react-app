import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { GoSearch } from "react-icons/go";

const Navbar = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, cartCount, wishlistCount }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top py-3 shadow-sm">
      <div className="container-fluid px-lg-5">
        {/* --- LOGO --- */}
        <Link className="navbar-brand fw-bold text-primary fs-3 me-4" to="/">
          SHO<span className="text-primary">FY</span>
        </Link>

        {/* --- NAV LINKS (The ones that were missing) --- */}
        <div className="collapse navbar-collapse flex-grow-0" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/products">Get Products</Link>
            </li>
            <li className="nav-item ms-lg-2">
              <Link className="btn btn-warning btn-sm fw-bold text-dark px-3" to="/addproducts">
                Upload Product
              </Link>
            </li>
          </ul>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="d-flex align-items-center flex-grow-1 mx-lg-4 mx-2">
          <form className="w-100 d-flex" onSubmit={(e) => { e.preventDefault(); navigate('/products'); }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" type="submit"><GoSearch /></button>
          </form>
        </div>

        {/* --- ACTIONS & CATEGORIES --- */}
        <div className="d-flex align-items-center gap-3">
          <div className="dropdown">
            <button className="btn btn-outline-light btn-sm dropdown-toggle border-0" data-bs-toggle="dropdown">
              {selectedCategory === "All" ? "Categories" : selectedCategory}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              {["All", "Laptops", "Phones", "Tablets","Gaming", "Accessories"].map(cat => (
                <li key={cat}>
                  <button className="dropdown-item" onClick={() => { setSelectedCategory(cat); navigate('/products'); }}>
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <Link to="/signin" className="btn btn-warning rounded-pill text-white fw-bold text-decoration-none btn-sm d-none d-md-block">Sign In</Link>
          <Link to="/signup" className="btn btn-warning text-white fw-bold btn-sm px-3 rounded-pill">Create Account</Link>

          {/* ICONS */}
          <div className="d-flex gap-3 ms-2">
            <Link to="/wishlist" className="text-white position-relative text-decoration-none">
              <FaRegHeart /><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>{wishlistCount}</span>
            </Link>
            <Link to="/cart" className="text-white position-relative text-decoration-none">
              <BsCart4 /><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{fontSize: '0.6rem'}}>{cartCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;