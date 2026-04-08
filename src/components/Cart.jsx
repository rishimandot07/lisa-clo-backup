import React, { useState } from "react";
import "./cart.css";
import {
  FaTrash,
  FaUserCircle,
  FaHome,
  FaRegHeart
} from "react-icons/fa";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import outfit1 from "../assets/cart/img1.jpg";
import outfit2 from "../assets/cart/img2.jpg";
import outfit3 from "../assets/cart/img3.jpg";

export default function CartPage() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const cartItems = [
    {
      id: 1,
      name: "off-Shoulder Top",
      price: 999,
      quantity: 1,
      image: outfit1,
    },
    {
      id: 2,
      name: "Straight Fit Jeans",
      price: 1599,
      quantity: 1,
      image: outfit2,
    },
    {
      id: 3,
      name: "Floral Dress",
      price: 1499,
      quantity: 1,
      image: outfit3,
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <header className="header">
        <div className="header-content">
          <Link to="/">
            <img src={logo} alt="Lisa Logo" className="logo" />
          </Link>
        </div>

        <h2 className="cart-title">Your Cart</h2>

        <div className="cart-header-icons">
          <Link to="/Wishlist" className="icon-btn" aria-label="Go to wishlist">
            <FaRegHeart />
          </Link>
          
          <Link to="/" className="icon-btn">
            <FaHome />
          </Link>
          
          <div className="account-menu">
            <button
              className="icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsAccountOpen((prev) => !prev);
              }}
            >
              <FaUserCircle />
            </button>

            <div className={`account-dropdown ${isAccountOpen ? "open" : ""}`}>
              <Link to="/signup" className="dropdown-btn">Register</Link>
              <Link to="/login" className="dropdown-btn">Login</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="cart-container">
        {/* Items */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />

              <div className="details">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <div className="quantity">
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                </div>
              </div>

              <FaTrash className="delete-icon" />
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h2>Order Summary</h2>

          {/* Savings Banner */}
          <p className="saved-banner">₹800.00 saved so far</p>

        <div className="summary-row">
          <span>MRP total</span>
          <span>₹{subtotal + 800}</span>
        </div>

        <div className="summary-row">
          <span>Discount on MRP</span>
          <span className="green">₹800.00</span>
        </div>

        <div className="summary-row">
          <span>Cart Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="summary-row">
          <span>Total discount</span>
          <span className="green">₹0.00</span>
        </div>

        <div className="summary-row">
          <span>Prepaid Discount</span>
          <span className="muted">To be calculated</span>
        </div>

        <div className="summary-row">
          <span>Shipping Charges</span>
          <span className="green">FREE</span>
        </div>

        <div className="summary-row">
          <span>Total savings</span>
          <span className="green">₹800.00</span>
        </div>

        <hr />

        <div className="summary-total">
          <span>Estimated Total</span>
          <span>₹{subtotal}</span>
        </div>

        <button className="checkout-btn">Checkout</button>
      </div>
      </div>
    </div>
  );
}