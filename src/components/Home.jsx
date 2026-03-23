import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Home = ({ setSelectedCategory }) => {
  const navigate = useNavigate();

  const categories = [
    { name: "Laptops", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" },
    { name: "Phones", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" },
    { name: "Tablets", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500" },
    { name: "Gaming", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500" }
  ];

  const handleCategoryClick = (catName) => {
    // Check if the prop exists before calling it
    if (setSelectedCategory) {
      setSelectedCategory(catName);
      navigate('/products');
    } else {
      console.warn("setSelectedCategory prop is missing!");
      navigate('/products');
    }
  };

  return (
    <div className="home-page" style={{backgroundColor: '#ffebeb'}}>
      {/* --- HERO CAROUSEL --- */}
      <div id="shofyHero" className="carousel slide hero-carousel" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200" className="d-block w-100" alt="Laptops" />
            <div className="carousel-caption d-none d-md-block text-start pb-5">
              <h1 className="display-4 fw-bold">Premium Laptops</h1>
              <p className="fs-5">Power your productivity with the latest tech.</p>
              <button className="btn btn-dark btn-lg px-4" onClick={() => handleCategoryClick('Laptops')}>Shop Laptops</button>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=1200" className="d-block w-100" alt="Phones" />
            <div className="carousel-caption d-none d-md-block text-start pb-5">
              <h1 className="display-4 fw-bold">Latest Smartphones</h1>
              <p className="fs-5">Upgrade your mobile experience today.</p>
              <button className="btn btn-dark btn-lg px-4" onClick={() => handleCategoryClick('Phones')}>View Phones</button>
            </div>
          </div>
        </div>
        
        {/* ARROWS - data-bs-target MUST match the ID above */}
        <button className="carousel-control-prev" type="button" data-bs-target="#shofyHero" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#shofyHero" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* --- CATEGORIES SECTION --- */}
      <div className="container py-5 mt-4">
        <h2 className="fw-bold text-center mb-5 pt-3 pb-3 " style={{backgroundColor: '#ebc3cb'}}>Browse Categories</h2>
        <div className="row justify-content-center">
          {categories.map((cat, index) => (
            <div className="col-6 col-md-3 mb-4" key={index}>
              <div 
                className="card h-100 border-0 shadow-sm p-4 category-card text-center" style={{backgroundColor: '#eee1e2', fontFamily: 'cursive'}} 
                onClick={() => handleCategoryClick(cat.name)}
              >
                <div className="category-circle">
                  <img src={cat.img} alt={cat.name} />
                </div>
                <h4 className="fw-bold mb-3">{cat.name}</h4>
                <span className="view-all-link">View All →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;