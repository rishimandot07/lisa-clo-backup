import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link ,useParams} from "react-router-dom";
import {
  FaRegHeart,
  FaHeart,
  FaHome,
  FaUserCircle,
  FaFilter,
} from "react-icons/fa";

import logo from "../assets/logo.png";
import "./CategoryPage.css";
import { apiPath, resolveMediaUrl } from "../config/api";

export default function CategoryPage() {
  const {category, type} = useParams();
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [allProducts, setAllProducts] = useState([]);
  const [wishlistedCards, setWishlistedCards] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
      const mapped = {};
      stored.forEach((item) => {
        mapped[item._id] = true;
      });
      return mapped;
    } catch {
      return {};
    }
  });
  const [burstCards, setBurstCards] = useState({});

  useEffect(() => {
    fetch(apiPath("/api/products"))
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);

const normalize = (str) => {
  return (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ""); // removes space, -, ', etc
};

 const filteredProducts = (allProducts || []).filter((p) => {
  const name = normalize(p.name);
  const categoryData = normalize(p.category);

  const selectedCategory = normalize(category);
  const selectedType = normalize(type);

  // CATEGORY
  const categoryMatch =
    !selectedCategory || categoryData === selectedCategory;

  // TYPE
  const typeMatch =
    !selectedType ||
    name.includes(selectedType) ||
    selectedType.includes(name);

  // SIZE
  const sizeMatch =
    !selectedSize ||
    (p.size && p.size.includes(selectedSize));

  // COLOR
  const colorMatch =
    !selectedColor ||
    (p.color && p.color.includes(selectedColor));

  // PRICE
  const priceMatch = p.price <= maxPrice;

  return (
    categoryMatch &&
    typeMatch &&
    sizeMatch &&
    colorMatch &&
    priceMatch
  );
});

  const toggleWishlist = (product) => {
  const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  const exists = wishlist.find((item) => item._id === product._id);

  if (exists) {
    const newWishlist = wishlist.filter(
      (item) => item._id !== product._id
    );
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));

    setWishlistedCards((prev) => {
      const updated = { ...prev };
      delete updated[product._id];
      return updated;
    });

    return;
  }

  const newWishlist = [...wishlist, product];
  localStorage.setItem("wishlist", JSON.stringify(newWishlist));

  setWishlistedCards((prev) => ({
    ...prev,
    [product._id]: true,
  }));

  setBurstCards((prev) => ({
    ...prev,
    [product._id]: true,
  }));

  setTimeout(() => {
    setBurstCards((prev) => {
      const updated = { ...prev };
      delete updated[product._id];
      return updated;
    });
  }, 500);
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
  image: product.image.startsWith("http")
  ? product.image
  : `${import.meta.env.VITE_API_URL}${product.image.startsWith("/") ? "" : "/"}${product.image}`,
  price: product.price,
  quantity: 1
});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  setCartItems(cart); // update UI
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
    <div className="category-page">
      <header className="header">
        <div className="header-content">
          <Link to="/">
            <img src={logo} alt="Lisa Logo" className="logo" />
          </Link>
        </div>

        <div className="category-header-icons">
          {/* FILTER BUTTON */}
          <button
            className="icon-btn"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FaFilter />
          </button>

          <Link to="/wishlist" className="icon-btn">
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

      <h2 className="category-page-title">{category?.toUpperCase()} COLLECTION</h2>

      {/* FILTER DROPDOWN */}
      {isFilterOpen && (
        <div className="filter-dropdown">
          <div className="filter-box">
            <div className="filter-header">
              <h2>Filters</h2>
              <button
  className="filter-close-btn"
  onClick={() => setIsFilterOpen(false)}
>
  <FaTimes />
</button>
            </div>

            {/* SIZE */}
            <div className="filter-section">
              <h3>Size</h3>
              <div className="filter-options">
                {["XS", "S", "M", "L"].map((size) => (
  <button
    key={size}
    onClick={() => setSelectedSize(size)}
    style={{
      background: selectedSize === size ? "#000" : "",
      color: selectedSize === size ? "#fff" : "",
    }}
  >
    {size}
  </button>
))}
              </div>
            </div>

            {/* COLOR */}
            <div className="filter-section">
              <h3>Color</h3>
              <div className="color-options">
                {[
                  "#000000",
                  "#ffffff",
                  "#ff6b6b",
                  "#4dabf7",
                  "#51cf66",
                  "#f8c8dc",   // pastel pink
                  "#d0ebff",   // pastel blue
                  "#fff3bf",   // pastel yellow
                  "#e6fcf5",   // pastel mint
                ].map((color, i) => (
                 <span
  key={i}
  className="color-circle"
  style={{
    background: color,
    border: selectedColor === color ? "2px solid black" : "",
    cursor: "pointer",
  }}
  onClick={() => setSelectedColor(color)}
></span>
              ))}
              </div>
            </div>

            {/* PRICE */}
            <div className="filter-section">
              <h3>Price</h3>
             <input
  type="range"
  min="0"
  max="1500"
  value={maxPrice}
  onChange={(e) => setMaxPrice(Number(e.target.value))}
/>
<p>₹0 - ₹{maxPrice}</p>
            </div>
            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
  
  {/* CLEAR FILTER (same as reset basically) */}
  <button
    onClick={() => {
      setSelectedSize("");
      setSelectedColor("");
      setMaxPrice(1500);
    }}
    style={{
      padding: "10px",
      flex: 1,
      border: "1px solid #ccc",
      background: "#fff",
      cursor: "pointer"
    }}
  >
    Clear Filters
  </button>

 
  <button
  onClick={() => {
    setIsFilterOpen(false);
  }}
  style={{
    padding: "10px",
    width: "100%",
    border: "none",
    background: "#000",
    color: "#fff",
    cursor: "pointer"
  }}
>
  Apply
</button>

</div>
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      <div className="product-grid">
        {filteredProducts.length === 0 && (
  <h2 style={{ textAlign: "center", marginTop: "50px" }}>
    No products found
  </h2>
)}
        {filteredProducts.map((item) => (
          <div className="product-card" key={item._id}>
            <div className="image-wrapper">
              <img
    className="product-image"
   src={resolveMediaUrl(item.image)}
    alt={item.name}
  />
              <button
                className={`wishlist-btn ${
                  wishlistedCards[item._id] ? "active" : ""
                } ${burstCards[item._id] ? "burst" : ""}`}
                onClick={() => toggleWishlist(item)}
              >
                {wishlistedCards[item._id] ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>

            <div className="product-info">
              <p className="product-name">{item.name}</p>
<p className="product-price">₹{item.price}</p>

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
      {
        cartItems.find((p) => p._id === item._id).quantity
      }
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
          </div>
        ))}
      </div>
    </div>
  );
}
