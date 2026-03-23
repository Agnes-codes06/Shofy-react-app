import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const GetProducts = ({ searchTerm, selectedCategory, addToCart, toggleWishlist, wishlist }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(""); 
  const [error, setError] = useState("");     
  const navigate = useNavigate();
  const itemsPerPage = 8;

  const image_url = "https://agnes.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    // REINSTATED: Original yellow warning message style
    setLoading("Please wait as we retrieve your products...");
    setError(""); 
    try {
      const response = await axios.get("https://agnes.alwaysdata.net/api/getproductdetails");
      setProducts(response.data);
      setLoading("");
    } catch (err) {
      setLoading("");
      setError("Failed to load products: " + err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // --- FILTER LOGIC (Maintained) ---
  const filtered = products.filter(item => {
    const name = item.product_name?.toLowerCase().trim() || "";
    const category = selectedCategory.toLowerCase().trim();
    const search = searchTerm.toLowerCase().trim();
    const desc = item.product_description?.toLowerCase().trim() || "";
    
    if (category === "all") return name.includes(search);

    const hasTag = desc.includes(`[${category}]`);
    let matchesKeyword = false;
    if (category === "laptops") {
      matchesKeyword = name.includes("hp") || name.includes("dell") || name.includes("macbook") || name.includes("surface");
    } else if (category === "phones") {
      matchesKeyword = name.includes("iphone") || (name.includes("samsung") && !name.includes("tab") && !name.includes("monitor"));
    } else if (category === "tablets") {
      matchesKeyword = name.includes("tab") || name.includes("ipad");
    }

    return (hasTag || matchesKeyword) && name.includes(search);
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="product-page-container" style={{backgroundColor: '#f7def1', minHeight: '100vh', padding: '40px 0'}}>
      <div className="container">
        
        <div className="mb-4 text-center">
            <h3 className="fw-bold mb-2">Showing: {selectedCategory}</h3>
            
            {/* REINSTATED: Original Status Messages */}
            {loading && <p className='text-warning fw-bold fs-5 animate-pulse'>{loading}</p>}
            {error && <p className='text-danger fw-bold'>{error} <button className="btn btn-sm btn-link" onClick={fetchProducts}>Retry</button></p>}
        </div>

        <div className="row">
          {!loading && (
            filtered.length > 0 ? (
              currentItems.map((p, index) => (
                <div className="col-md-3 mb-4" key={index}>
                  <div className="card h-100 shadow-sm border-0 bg-white overflow-hidden product-card-hover">
                    {/* Wishlist Icon */}
                    <button className="btn position-absolute top-0 end-0 m-2 bg-white rounded-circle shadow-sm p-0" 
                            style={{zIndex: 10, width: '32px', height: '32px'}} 
                            onClick={() => toggleWishlist(p)}>
                      {wishlist.some(i => i.product_name === p.product_name) ? '❤️' : '🤍'}
                    </button>
                    
                    <div className="d-flex align-items-center justify-content-center" style={{height: '200px'}}>
                        <img src={image_url + p.product_photo} className="img-fluid p-3" alt={p.product_name} style={{maxHeight: '100%', objectFit: 'contain'}} />
                    </div>

                    <div className="card-body text-center d-flex flex-column">
                      <h6 className="fw-bold mb-1 text-truncate">{p.product_name}</h6>
                      <p className="text-muted small mb-2" style={{height: '40px', overflow: 'hidden'}}>
                        {p.product_description?.replace(/^\[.*?\]\s*/, '')}
                      </p>
                      
                      <h5 className="fw-bold mt-auto text-success">Ksh {p.product_cost}</h5>
                      
                      <div className="d-grid gap-2 mt-3">
                        <button className="btn btn-dark btn-sm py-2 fw-bold" onClick={() => navigate("/mpesa", {state: {product: p}})}>Pay Now</button>
                        <button className="btn btn-outline-primary btn-sm fw-bold" onClick={() => addToCart(p)}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-5 w-100 mt-5">
                <h4 className="text-muted mt-3">No products found in {selectedCategory}</h4>
                <button className="btn btn-primary rounded-pill px-4 mt-2" onClick={() => navigate('/')}>Return Home</button>
              </div>
            )
          )}
        </div>

        {/* --- PAGINATION --- */}
        {!loading && !error && totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5 gap-3">
            <button className="btn bg-warning rounded-pill fw-bold text-white px-4" disabled={currentPage === 1} onClick={() => setCurrentPage(c => c - 1)}>Prev</button>
            <span className="fw-bold align-self-center">Page {currentPage} of {totalPages}</span>
            <button className="btn bg-warning rounded-pill text-white fw-bold px-4" disabled={currentPage === totalPages} onClick={() => setCurrentPage(c => c + 1)}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetProducts;