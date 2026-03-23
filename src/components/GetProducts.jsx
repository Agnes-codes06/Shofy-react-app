import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GetProducts = ({ searchTerm, selectedCategory, addToCart, toggleWishlist, wishlist }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(""); // Loading state
  const [error, setError] = useState("");     // Error state
  const navigate = useNavigate();
  const itemsPerPage = 8;

  const image_url = "https://agnes.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    setLoading("Please wait as we retrieve your products...");
    setError(""); // Reset error before trying
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

  // Filter Logic (Keeps your smart recognition)
  const filtered = products.filter(item => {
    const name = item.product_name?.toLowerCase() || "";
    const desc = item.product_description?.toLowerCase() || "";
    const s = selectedCategory.toLowerCase();
    
    if (s === "all") return name.includes(searchTerm.toLowerCase());

    const hasTag = desc.includes(`[${s}]`);
    let matchesKeyword = false;
    if (s === "laptops") {
      matchesKeyword = name.includes("hp") || name.includes("dell") || name.includes("macbook") || name.includes("surface") || name.includes("laptop");
    } else if (s === "phones") {
      matchesKeyword = name.includes("iphone") || (name.includes("samsung") && !name.includes("tab")) || name.includes("phone");
    } else if (s === "tablets") {
      matchesKeyword = name.includes("tab") || name.includes("ipad") || name.includes("tablet");
    }

    const matchesCategory = hasTag || matchesKeyword;
    const matchesSearch = name.includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="product-page-container" style={{backgroundColor: '#faedee', minHeight: '100vh', padding: '40px 0'}}>
      <div className="container">
        <h3 className="mb-4 fw-bold border-bottom pb-2">Showing: {selectedCategory}</h3>
        
        {/* Loading and Error Messages */}
        {loading && <div className="text-center py-5"><h4 className="text-warning">{loading}</h4></div>}
        {error && <div className="text-center py-5"><h4 className="text-danger">{error}</h4></div>}

        <div className="row">
          {/* Only show products if not loading and no error */}
          {!loading && !error && (
            currentItems.length > 0 ? (
              currentItems.map((p, index) => (
                <div className="col-md-3 mb-4" key={index}>
                  <div className="card h-100 shadow-sm border-0 product-card">
                    <button className="btn position-absolute top-0 end-0 m-1" style={{zIndex: 10}} onClick={() => toggleWishlist(p)}>
                      {wishlist.some(i => i.product_name === p.product_name) ? '❤️' : '🤍'}
                    </button>
                    <img src={image_url + p.product_photo} className="product_img p-3" alt={p.product_name} />
                    <div className="card-body text-center d-flex flex-column">
                      <h6 className="fw-bold mb-1">{p.product_name}</h6>
                      <p className="text-muted small mb-2">{p.product_description?.replace(/\[.*?\] /, '')}</p>
                      <h5 className="text-success fw-bold mt-auto">Ksh {p.product_cost}</h5>
                      <div className="d-grid gap-2 mt-2">
                        {/* Direct to Mpesa for "Pay Now" */}
                        <button className="btn btn-dark btn-sm" onClick={() => navigate("/mpesa", {state: {product: p}})}>Pay Now</button>
                        <button className="btn btn-outline-primary btn-sm" onClick={() => addToCart(p)}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-5 w-100"><h4>No products found in {selectedCategory}</h4></div>
            )
          )}
        </div>

        {!loading && !error && totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5 gap-3">
            <button className="btn btn-warning" disabled={currentPage === 1} onClick={() => setCurrentPage(c => c - 1)}>Prev</button>
            <span className="fw-bold align-self-center">Page {currentPage} of {totalPages}</span>
            <button className="btn btn-warning" disabled={currentPage === totalPages} onClick={() => setCurrentPage(c => c + 1)}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetProducts;