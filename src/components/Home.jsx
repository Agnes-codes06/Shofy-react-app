import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; 

const Home = ({ setSelectedCategory }) => {
  const navigate = useNavigate();
  const [bestSelling, setBestSelling] = useState([]);
  const image_url = "https://agnes.alwaysdata.net/static/images/";

  // Fetch products for Best Selling section
  useEffect(() => {
    const fetchBestSelling = async () => {
      try {
        const response = await axios.get("https://agnes.alwaysdata.net/api/getproductdetails");
        setBestSelling(response.data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchBestSelling();
  }, []);

  const categories = [
    { name: "Laptops", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" },
    { name: "Phones", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" },
    { name: "Tablets", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500" },
    { name: "Gaming", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500" }
  ];

  const handleCategoryClick = (catName) => {
    if (setSelectedCategory) {
      // Ensure catName matches exactly what your product filter expects
      setSelectedCategory(catName);
      navigate('/products');
    } else {
      navigate('/products');
    }
  };

  return (
    <div className="home-page" style={{backgroundColor: '#e9dae6'}}>
      
      {/* --- HERO CAROUSEL --- */}
      <div id="shofyHero" className="carousel slide hero-carousel" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200" className="d-block w-100 hero-img" alt="Laptops" />
            <div className="carousel-caption d-none d-md-block text-start pb-5">
              <h1 className="display-4 fw-bold">Premium Laptops</h1>
              <p className="fs-5">Power your productivity with the latest tech.</p>
              {/* FIXED: Explicitly passing 'Laptops' to filter products correctly */}
              <button className="btn btn-warning btn-lg px-4" onClick={() => handleCategoryClick('Laptops')}>Shop Now</button>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=1200" className="d-block w-100 hero-img" alt="Phones" />
            <div className="carousel-caption d-none d-md-block text-start pb-5">
              <h1 className="display-4 fw-bold">Latest Smartphones</h1>
              <p className="fs-5">Upgrade your mobile experience today.</p>
              {/* FIXED: Explicitly passing 'Phones' to filter products correctly */}
              <button className="btn btn-warning btn-lg px-4" onClick={() => handleCategoryClick('Phones')}>Shop Now</button>
            </div>
          </div>
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#shofyHero" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#shofyHero" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* --- BEST SELLING SECTION --- */}
      <div className="container py-5 mt-4">
        <h2 className="fw-bold mb-4 border-start border-primary border-4 ps-3">Best Selling Products</h2>
        <div className="row">
          {bestSelling.map((p, index) => (
            <div className="col-6 col-md-3 mb-4" key={index}>
              <div className="card h-100 border-0 shadow-sm text-center p-3 best-selling-card" onClick={() => navigate('/products')}>
                <div className="img-container mb-3" style={{height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <img src={image_url + p.product_photo} alt={p.product_name} className="img-fluid" style={{maxHeight: '100%'}} />
                </div>
                <h6 className="text-muted small text-truncate mb-1">{p.product_name}</h6>
                <p className="fw-bold text-dark m-0">Ksh {p.product_cost}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CATEGORIES SECTION --- */}
      <div className="container py-5">
        <h2 className="fw-bold text-center mb-5 pt-3 pb-3 rounded shadow-sm" style={{backgroundColor: '#e9b9c3'}}>Browse Categories</h2>
        <div className="row justify-content-center">
          {categories.map((cat, index) => (
            <div className="col-6 col-md-3 mb-4" key={index}>
              <div
                className="card h-100 border-0 shadow-sm p-4 category-card text-center"
                style={{backgroundColor: '#e2c7c9', fontFamily: 'cursive', cursor: 'pointer'}}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <div className="category-circle mb-3 overflow-hidden rounded-circle mx-auto" style={{width: '100px', height: '100px'}}>
                  <img src={cat.img} alt={cat.name} className="w-100 h-100" style={{objectFit: 'cover'}} />
                </div>
                <h4 className="fw-bold mb-3">{cat.name}</h4>
                <span className="view-all-link text-primary fw-bold">View All →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;