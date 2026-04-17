import React, { useEffect , useState} from "react";
import "./wishlist.css";
import { Link } from "react-router-dom";
import { FaTimes, FaHome, FaUserCircle } from "react-icons/fa";

import logo from "../assets/logo.png";

export default function Wishlist() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [items, setItems] = useState(() => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
});
const [cartItems, setCartItems] = useState([]);
useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  setCartItems(storedCart);
}, []);

 const removeItem = (id) => {
  const updated = items.filter((item) => item._id !== id);
  setItems(updated);

  localStorage.setItem("wishlist", JSON.stringify(updated));
};
const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item._id === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
  _id: product._id,
  name: product.name,
  image: product.image,
  price: product.price,   // ✅ ADD THIS LINE
  quantity: 1
});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  setCartItems(cart);
};

const increaseQty = (id) => {
  let cart = [...cartItems];

  cart = cart.map((item) =>
    item._id === id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  setCartItems(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const decreaseQty = (id) => {
  let cart = [...cartItems];

  cart = cart
    .map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0);

  setCartItems(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
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
                  onClick={() => removeItem(item._id)}
                >
                  <FaTimes />
                </button>

                <div className="wishlist-img">
                 <img
  src={
    item.image
      ? `http://localhost:8000/uploads/${item.image.split("/").pop()}`
      : "/fallback.png"
  }
  alt={item.name}
/>
                </div>

                <h3>{item.name}</h3>
                <p className="price">₹ {item.price}</p>

                <select className="size-select">
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                </select>

                {cartItems.find((p) => p._id === item._id) ? (
  <div className="qty-control">
    <button onClick={() => decreaseQty(item._id)}>-</button>

    <span>
      {cartItems.find((p) => p._id === item._id).quantity}
    </span>

    <button onClick={() => increaseQty(item._id)}>+</button>
  </div>
) : (
  <button
    className="add-btn"
    onClick={() => addToCart(item)}
  >
    Add to Cart
  </button>
)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}