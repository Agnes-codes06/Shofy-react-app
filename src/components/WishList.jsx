import React from 'react';
import { useNavigate } from 'react-router-dom';

const Wishlist = ({ wishlist, toggleWishlist, addToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="container py-5 mt-4">
      <h2 className="fw-bold mb-4">My Wishlist ❤️</h2>
      {wishlist.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">Your wishlist is empty.</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>Go Shopping</button>
        </div>
      ) : (
        <div className="row">
          {wishlist.map((p, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100 shadow-sm border-0 text-center p-3">
                <img src={`https://agnes.alwaysdata.net/static/images/${p.product_photo}`} className="card-img-top mx-auto" style={{height:'150px', objectFit:'contain'}} alt={p.product_name}/>
                <h6 className="mt-3 fw-bold">{p.product_name}</h6>
                <p className="text-success">Ksh {p.product_cost}</p>
                <div className="d-grid gap-2">
                  {/* Seamless Transfer */}
                  <button className="btn btn-primary btn-sm" onClick={() => { addToCart(p); toggleWishlist(p); navigate('/cart'); }}>
                    Move to Cart
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => toggleWishlist(p)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;