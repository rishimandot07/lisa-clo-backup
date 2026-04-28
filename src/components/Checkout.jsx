import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaRegHeart, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./checkout.css";

export default function CheckoutPage() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  city: "",
  addressOne: "",
  addressTwo: "",
  state: "",
  pincode: "",
  notes: ""
});

const [cartItems, setCartItems] = useState([]);
useEffect(() => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  setCartItems(cart);
}, []);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value
  });
};

 const subtotal = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

const shipping = 0;
const total = subtotal + shipping;

const placeOrder = async () => {
  const orderData = {
    customer: {
      name: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      city: document.getElementById("city").value,
      address1: document.getElementById("addressOne").value,
      address2: document.getElementById("addressTwo").value,
      state: document.getElementById("state").value,
      pincode: document.getElementById("pincode").value,
      notes: document.getElementById("notes").value,
    },
    items: JSON.parse(localStorage.getItem("cart")) || [],
    total: total,
  };

  console.log("📦 Sending order:", orderData);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
      method: "POST", // ✅ VERY IMPORTANT
      headers: {
        "Content-Type": "application/json", // ✅ VERY IMPORTANT
      },
      body: JSON.stringify(orderData), // ✅ VERY IMPORTANT
    });

    const data = await res.json();

    alert("Order Placed ✅");

  } catch (err) {
    console.error(err);
    alert("Server error ❌");
  }
};

  return (
    <div className="checkout-page">
      <header className="header">
        <div className="header-content">
          <Link to="/">
            <img src={logo} alt="Lisa Logo" className="logo" />
          </Link>
        </div>

        <h2 className="checkout-title">Checkout</h2>

        <div className="checkout-header-icons">
          <Link to="/wishlist" className="icon-btn" aria-label="Go to wishlist">
            <FaRegHeart />
          </Link>

          <Link to="/" className="icon-btn" aria-label="Go to home">
            <FaHome />
          </Link>

          <div className="account-menu">
            <button
              className="icon-btn"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsAccountOpen((prev) => !prev);
              }}
            >
              <FaUserCircle />
            </button>

            <div className={`account-dropdown ${isAccountOpen ? "open" : ""}`}>
              <Link to="/signup" className="dropdown-btn">
                Register
              </Link>
              <Link to="/login" className="dropdown-btn">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="checkout-layout">
        <section className="checkout-form-panel">
          <div className="checkout-panel-header">
            <p className="checkout-step-label">Checkout details</p>
            <h1>Shipping & Contact</h1>
            <p>Fill in your details so the team can wire payment and order flow later.</p>
          </div>

          <div className="checkout-form-grid">
            <div className="field-group">
              <label htmlFor="fullName">Full name</label>
             <input
              id="fullName"
             type="text"
             placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="field-group full-width">
              <label htmlFor="addressOne">Address line 1</label>
              <input
                id="addressOne"
                type="text"
                placeholder="House number and street name"
                value={formData.addressOne}
                onChange={handleChange}
              />
            </div>

            <div className="field-group full-width">
              <label htmlFor="addressTwo">Address line 2</label>
              <input
                id="addressTwo"
                type="text"
                placeholder="Apartment, suite, landmark (optional)"
                value={formData.addressTwo}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                placeholder="Enter your state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode"
                type="text"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>

            <div className="field-group full-width">
              <label htmlFor="notes">Order notes</label>
              <textarea
                id="notes"
                rows="5"
                placeholder="Add delivery notes or any special instructions"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </section>

        <aside className="checkout-summary-panel">
          <h2>Your Order</h2>

          <div className="summary-items">
            {cartItems.map((item) => (
            <div key={item._id} className="summary-item">
             <div>
              <p className="summary-item-name">{item.name}</p>
              <p className="summary-item-meta">Qty: {item.quantity}</p>
             </div>
             <span>₹{item.price}</span>
            </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
          </div>

          <div className="summary-total-row">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button onClick={placeOrder} className="place-order-btn" type="button" >
            Place Order
          </button>

          <p className="checkout-note">
                  Payment will be connected later.
          </p>
        </aside>
      </main>
    </div>
  );
}
