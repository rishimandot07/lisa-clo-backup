import React, { useState } from "react";
import "./wishlist.css";
import { Link } from "react-router-dom";
import { FaTimes, FaHome, FaUserCircle } from "react-icons/fa";

import logo from "../assets/logo.png";
import outfit1 from "../assets/wishlist/img1.jpg";
import outfit2 from "../assets/wishlist/img2.jpg";
import outfit3 from "../assets/wishlist/img3.jpg";
import outfit4 from "../assets/wishlist/img4.jpg";

export default function Wishlist() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Off Shoulder Mesh Red Dress",
      price: 1199,
      size: "XS",
      image: outfit1,
    },
    {
      id: 2,
      name: "Brown Bodycon Dress",
      price: 1299,
      size: "XS",
      image: outfit2,
    },
    {
      id: 3,
      name: "Oversized Top",
      price: 999,
      size: "XS",
      image: outfit3,
    },
    {
      id: 4,
      name: "Bell sleeves Top",
      price: 549,
      size: "XS",
      image: outfit4,
    },
  ]);

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="wishlist-page">

      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <Link to="/">
            <img src={logo} alt="Lisa Logo" className="logo" />
          </Link>
        </div>

        <h2 className="wishlist-title">My Wishlist</h2>

        <div className="wishlist-header-icons">
          <Link to="/" className="icon-btn">
            <FaHome />
          </Link>

          <div className="account-menu">
            <button
              className="icon-btn"
              onClick={() => setIsAccountOpen(!isAccountOpen)}
            >
              <FaUserCircle />
            </button>

            <div className={`account-dropdown ${isAccountOpen ? "open" : ""}`}>
              <Link to="/login" className="dropdown-btn">Login</Link>
              <Link to="/signup" className="dropdown-btn">Signup</Link>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="wishlist-container">

        {items.length === 0 ? (
          <div className="empty-state">
            <h2>Your wishlist is empty 💔</h2>
            <Link to="/" className="shop-btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {items.map((item) => (
              <div className="wishlist-card" key={item.id}>
                
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  <FaTimes />
                </button>

                <div className="wishlist-img">
                  <img src={item.image} alt={item.name} />
                </div>

                <h3>{item.name}</h3>
                <p className="price">₹ {item.price}</p>

                <select className="size-select">
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                </select>

                <button className="add-btn">Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}