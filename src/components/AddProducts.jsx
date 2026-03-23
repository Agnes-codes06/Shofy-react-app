import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  // 1. FORM DATA STATES
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Laptops"); 
  const [file, setFile] = useState(null);

  // 2. FEEDBACK STATES (The labels you wanted)
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setError("");
    setSuccess("");
    setLoading("Please wait as we upload your product...");

    // Create the Envelope
    const formData = new FormData();
    formData.append("product_name", name);
    formData.append("product_cost", cost);
    // Combine Category and Description
    formData.append("product_description", `[${category}] ${desc}`);
    formData.append("product_photo", file);

    try {
      // Use the URL from your working backend (ensure it matches your Flask route)
      const response = await axios.post("https://agnes.alwaysdata.net/api/addproducts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(""); // Stop loading
      setSuccess("Product added successfully " + category + " category!");
      
      // Optional: Clear form after 2 seconds and navigate
      setTimeout(() => {
        navigate('/products');
      }, 2000);

    } catch (err) {
      setLoading(""); // Stop loading
      setError("Upload failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="card shadow-lg p-4 mx-auto border-0" style={{ maxWidth: '500px' }}>
        <h3 className="fw-bold mb-4 text-center text-primary">Add New Product</h3>
        
        {/* FEEDBACK LABELS SECTION */}
        <div className="text-center mb-3">
          {loading && <p className="text-warning fw-bold">{loading}</p>}
          {success && <p className="text-success fw-bold">{success}</p>}
          {error && <p className="text-danger fw-bold">{error}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          {/* CATEGORY SELECTOR */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-muted text-uppercase">Select Category</label>
            <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Laptops">Laptops</option>
              <option value="Phones">Phones</option>
              <option value="Tablets">Tablets</option>
              <option value="Gaming">Gaming</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Product Name" 
              onChange={e => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <input type="number" className="form-control" placeholder="Cost (Ksh)" 
              onChange={e => setCost(e.target.value)} required />
          </div>

          <div className="mb-3">
            <textarea className="form-control" rows="3" placeholder="Describe your product..." 
              onChange={e => setDesc(e.target.value)} required />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold small text-muted text-uppercase">Upload Photo</label>
            <input type="file" className="form-control" accept="image/*"
              onChange={e => setFile(e.target.files[0])} required />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={loading !== ""}>
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;