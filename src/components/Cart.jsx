import React, { useState , useEffect } from "react";
import "./cart.css";
import {
  FaTrash,
  FaUserCircle,
  FaHome,
  FaRegHeart
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";



export default function CartPage() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  setCartItems(storedCart);
}, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 800;

const mrpTotal = subtotal + discount;
const totalDiscount = discount;
const estimatedTotal = subtotal;

const increaseQty = (id) => {
  let updated = cartItems.map((item) =>
    item._id === id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  setCartItems(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};

const decreaseQty = (id) => {
  let updated = cartItems
    .map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0);

  setCartItems(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};

const removeItem = (id) => {
  const updated = cartItems.filter((item) => item._id !== id);
  setCartItems(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};

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
            <div key={item._id} className="cart-item">
              <img
  src={`http://localhost:8000/uploads/${item.image.split("/").pop()}`}
  alt={item.name}
/>

              <div className="details">
                <h3>{item.name}</h3>
                <p>₹{(item.price || 0) * item.quantity}</p>
<p className="unit-price">₹{item.price} each</p>

                <div className="quantity">
  <button onClick={() => decreaseQty(item._id)}>-</button>
  <span>{item.quantity}</span>
  <button onClick={() => increaseQty(item._id)}>+</button>
</div>
              </div>

              <FaTrash
  className="delete-icon"
  onClick={() => removeItem(item._id)}
/>
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
          <span>₹{mrpTotal}</span>
        </div>

        <div className="summary-row">
          <span>Discount on MRP</span>
          <span>₹{totalDiscount}</span>
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
          <span>₹{estimatedTotal}</span>
        </div>

        <button className="checkout-btn">Checkout</button>
      </div>
      </div>
    </div>
  );
}