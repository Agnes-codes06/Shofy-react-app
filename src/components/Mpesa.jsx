import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Mpesa = () => {
  const location = useLocation();
  // Receive state: could be 'product' (single) or 'amount' (cart)
  const { product, amount, productName } = location.state || {};

  // Determine final values to avoid "undefined" errors
  const finalAmount = amount || product?.product_cost || 0;
  const finalName = productName || product?.product_name || "Cart Total";

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait for M-Pesa STK Push...");
    setError("");

    try {
      const data = new FormData();
      data.append("amount", finalAmount);
      data.append("phone", phone);

      const response = await axios.post("https://agnes.alwaysdata.net/api/mpesa_payment", data);
      setSuccess("Payment Initiated! Check your phone.");
      setLoading("");
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  return (
    <div className='container py-5'>
      <div className="row justify-content-center">
        <div className="col-md-6 card shadow p-4 text-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" alt="Mpesa" style={{width: '150px'}} className="mx-auto mb-3"/>
          <h2 className="fw-bold">Lipa na M-Pesa</h2>
          
          <div className="my-3 p-3 bg-light rounded">
            <h5 className="text-primary">{finalName}</h5>
            <h3 className="text-success fw-bold">Ksh {finalAmount}</h3>
          </div>

          {loading && <p className='text-warning fw-bold'>{loading}</p>}
          {success && <p className='text-success fw-bold'>{success}</p>}
          {error && <p className='text-danger fw-bold'>{error}</p>}

          <form onSubmit={submit} className="mt-4">
            <div className="mb-3 text-start">
              <label className="form-label">Phone Number (254...)</label>
              <input 
                type="tel" 
                placeholder='e.g. 254712345678' 
                className='form-control border-primary' 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button className='btn btn-success w-100 py-2 fw-bold'>Pay Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Mpesa;