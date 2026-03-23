import React from 'react';

const About = () => {
  return (
    <div className="container py-5 mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="fw-bold mb-4">About <span className="text-primary">Shofy</span></h1>
          <p className="lead text-muted">
            Founded in 2026, Shofy has grown from a small Nairobi startup to Kenya's 
            most trusted destination for premium electronics.
          </p>
          <p>
            We specialize in high-performance laptops, the latest smartphones, and 
            essential tech accessories. Our mission is to provide quality tech with 
            seamless M-Pesa integration for a frictionless shopping experience.
          </p>
          <div className="row mt-4">
            <div className="col-6">
              <h3 className="text-primary fw-bold">10k+</h3>
              <p className="small">Happy Customers</p>
            </div>
            <div className="col-6">
              <h3 className="text-primary fw-bold">24/7</h3>
              <p className="small">Expert Support</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80" 
            alt="Tech Office" 
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default About;