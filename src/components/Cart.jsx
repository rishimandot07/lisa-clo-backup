import React, { useState } from "react";
import "./cart.css";
import {
  FaTrash,
  FaUserCircle,
  FaHome
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const cartItems = [
    {
      id: 1,
      name: "Beige Oversized Hoodie",
      price: 59,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Ribbed Midi Dress",
      price: 75,
      quantity: 1,
      image: "https://via.placeholder.com/100",
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
          <h1 className="logo">Lisa</h1>
        </div>

        <h2 className="cart-title">Your Cart</h2>

        <div className="cart-header-icons">
          <Link to="/" className="icon-btn">
            <FaHome />
          </Link>

          {/* 🔥 ACCOUNT DROPDOWN */}
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
                <p>${item.price}</p>

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
          <h2>Summary</h2>
          <p>Subtotal: ${subtotal}</p>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
}