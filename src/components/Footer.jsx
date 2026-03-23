import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* Column 1: Brand */}
          <div className="col-md-4 mb-4 text-start">
            <h4 className="fw-bold text-warning">SHOFY</h4>
            <p className="text-white">
              Your trusted store for laptops, phones, and accessories.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4 mb-4 text-center">
            <h5 className="fw-bold text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-white text-decoration-none">Products</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white text-decoration-none">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="col-md-4 mb-4 text-end">
            <h5 className="fw-bold text-warning">Contact</h5>
            <p className="text-white mb-1">Email: support@shofy.com</p>
            <p className="text-white mb-1">Phone: +254 700 000 000</p>
            <p className="text-white">Nairobi, Kenya</p>
          </div>
        </div>
        
        <hr className="border-secondary opacity-25" />
        
        <div className="text-center">
          <p className="text-warning small">© 2026 Shofy Electronics Store</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;