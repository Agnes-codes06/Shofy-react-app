import React, { useState } from 'react';

const Contact = () => {
  const [status, setStatus] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    setStatus("Message sent successfully! We will get back to you soon.");
    e.target.reset();
  };

  return (
    <div className="container py-5 mt-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Contact Our Team</h2>
        <p className="text-muted">Have a question? We're here to help.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-5 mb-4">
          <div className="card border-0 shadow-sm p-4 bg-dark text-white h-100">
            <h4>Contact Information</h4>
            <p className="mt-4">📍 Nairobi, Kenya</p>
            <p>📞 +254 700 000 000</p>
            <p>📧 support@shofy.com</p>
            <div className="mt-auto pt-4">
              <h6>Office Hours</h6>
              <p className="small mb-0">Mon - Sat: 8:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card border-0 shadow-sm p-4">
            {status && <div className="alert alert-success">{status}</div>}
            <form onSubmit={handleSend}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input type="text" className="form-control border-light shadow-sm" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control border-light shadow-sm" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control border-light shadow-sm" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-dark w-100 py-2">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;