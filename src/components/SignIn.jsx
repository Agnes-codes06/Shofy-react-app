import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  // 1. DATA STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. FEEDBACK STATES (The ones you wanted to keep)
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Clear previous messages and start loading
    setError("");
    setSuccess("");
    setLoading("Please wait as we log you in...");

    try {
      // Use FormData as per your original working code
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post("https://agnes.alwaysdata.net/api/signin", data);

      setLoading(""); // Stop loading message

      // check if the response has user item
      if (response.data.user) {
        // Store user details in localstorage for the session
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        setSuccess(response.data.message || "Login Successful! Redirecting...");

        // Redirect to home after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        // User not found or wrong credentials
        setError(response.data.message || "Invalid email or password.");
      }

    } catch (err) {
      setLoading("");
      // Safely catch the error message from the server or axios
      setError(err.response?.data?.message || "An error occurred during sign in.");
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center mt-5" style={{backgroundColor: 'rgba(215, 208, 226, 1)'}}>
      <div className="card shadow-lg p-4 border-0" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Sign In</h2>
        
        {/* FEEDBACK MESSAGES */}
        <div className="text-center mb-3">
          {loading && <p className="text-warning small fw-bold">{loading}</p>}
          {success && <p className="text-success small fw-bold">{success}</p>}
          {error && <p className="text-danger small fw-bold">{error}</p>}
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            
            <input 
              type="email" 
              className="form-control bg-light" 
              placeholder="Enter your Email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          <div className="mb-4">
            
            <input 
              type="password" 
              className="form-control bg-light" 
              placeholder="Enter password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2 fw-bold"
            disabled={loading !== ""}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center small">
          Don't have an account? <Link to="/signup" className="text-decoration-none fw-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;