import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + Number(item.product_cost), 0);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Shopping Cart ({cart.length})</h2>
      <div className="row">
        <div className="col-md-8">
          {cart.map((item, index) => (
            <div className="card mb-2 p-3 shadow-sm d-flex flex-row align-items-center justify-content-between border-0" key={index}>
              <div className="d-flex align-items-center">
                <img src={`https://agnes.alwaysdata.net/static/images/${item.product_photo}`} style={{width:'50px'}} alt=""/>
                <span className="ms-3 fw-bold">{item.product_name}</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="me-4 text-success fw-bold">Ksh {item.product_cost}</span>
                <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card p-4 bg-dark text-white shadow">
            <h4>Total: Ksh {total.toLocaleString()}</h4>
            <button 
              className="btn btn-warning w-100 mt-3 fw-bold" 
              onClick={() => navigate('/mpesa', { state: { amount: total, productName: "Bulk Cart Purchase" } })}
            >
              Checkout & Pay All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;