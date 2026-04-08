import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaHome, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { gender, category } = useParams();
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [wishlistedCards, setWishlistedCards] = useState({});
  const [burstCards, setBurstCards] = useState({});

  const toggleWishlist = (cardId) => {
    const isCurrentlyWishlisted = !!wishlistedCards[cardId];

    if (isCurrentlyWishlisted) {
        setWishlistedCards((prev) => {
            const updated = { ...prev };
            delete updated[cardId];
            return updated;
        });
        return;
    }

    setWishlistedCards((prev) => ({ ...prev, [cardId]: true }));
    setBurstCards((prev) => ({ ...prev, [cardId]: true }));
    setTimeout(() => {
        setBurstCards((prev) => {
            const updated = { ...prev };
            delete updated[cardId];
            return updated;
        });
    }, 520);
 };

  return (
    <div className="category-page">
      <header className="header">
        <div className="header-content">
            <Link to="/">
                <img src={logo} alt="Lisa Logo" className="logo" />
            </Link>
        </div>

        <div className="category-header-icons">
            <Link to="/Wishlist" className="icon-btn">
            <FaRegHeart />
            </Link>

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

      <div className="product-grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
            <div className="product-card" key={item}>
  
                <div className="image-wrapper">
                    <button
                        className={`wishlist-btn ${wishlistedCards[item] ? "active" : ""} ${burstCards[item] ? "burst" : ""}`}
                        onClick={() => toggleWishlist(item)}
                    >
                    {wishlistedCards[item] ? <FaHeart /> : <FaRegHeart />}
                    </button>
                </div>

                <div className="product-info">
                    <p className="product-name">Sample Product</p>
                    <p className="product-price">₹999</p>

                    <select className="size-select">
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    </select>

                    <button className="add-btn">Add to Cart</button>
                </div>

            </div>
        ))}
    </div>
    </div>
  );
}