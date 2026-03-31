import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegHeart,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import "./Home.css";
import slideOne from "../../example images/pexels-cesar-o-neill-26650613-29427399.jpg.jpeg";
import slideTwo from "../../example images/pexels-ryanjvr-2314992.jpg.jpeg";
import slideThree from "../../example images/pexels-shkrabaanthony-7081111.jpg.jpeg";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [slideOne, slideTwo, slideThree];

  const suggestions = [
    { name: "Everyday Joggers", price: "Rs. 1,199.00" },
    { name: "Oversized T-Shirt", price: "Rs. 999.00" },
    { name: "Performance Hoodie", price: "Rs. 1,499.00" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="page">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Lisa</h1>
        </div>

        <nav className="center-nav" aria-label="Categories">
          <button className="category-btn" type="button">
            Men
          </button>
          <button className="category-btn" type="button">
            Women
          </button>
          <button className="category-btn" type="button">
            Gen Z
          </button>
        </nav>

        <nav className="header-actions right-actions">
          <div className="search-hover-wrap">
            <button
              className="icon-btn search-trigger"
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              aria-label="Open search"
            >
              <FaSearch />
            </button>
          </div>
          <button className="icon-btn" type="button" aria-label="Wishlist">
            <FaRegHeart />
          </button>
          <Link to="/Cart" className="icon-btn" aria-label="Go to cart">
            <FaShoppingCart />
          </Link>
          <div className="account-menu">
            <button
              className="icon-btn"
              type="button"
              aria-label="Account menu"
              onClick={() => setIsAccountOpen((prev) => !prev)}
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
        </nav>
      </header>

      <main className="content">
        <section className="hero-carousel" aria-label="Featured products">
          <button
            className="carousel-btn prev"
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>

          {slides.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Showcase ${index + 1}`}
              className={`carousel-image ${
                index === currentSlide ? "active" : ""
              }`}
            />
          ))}

          <button
            className="carousel-btn next"
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-col">
          <h2>About</h2>
          <p></p>
        </div>
        <div className="footer-col">
          <h2>Contact Details</h2>
          <p>Email: support@lisa.store</p>
          <p>Phone: 123456789</p>
          <p>Address: Mumbai, Maharashtra</p>
        </div>
      </footer>

      <div
        className={`search-overlay ${isSearchOpen ? "open" : ""}`}
        onClick={() => setIsSearchOpen(false)}
      >
        <div
          className={`search-modal ${isSearchOpen ? "open" : ""}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="search-header">
            <h2>Search</h2>
            <button
              className="icon-btn"
              type="button"
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
            >
              <FaTimes />
            </button>
          </div>

          <div className="search-input-wrap">
            <input
              type="text"
              placeholder="Suggested searches"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button className="icon-btn" type="button" aria-label="Search">
              <FaSearch />
            </button>
          </div>

          <div className="search-grid">
            <div>
              <h3>Popular categories</h3>
              <ul className="category-list">
                <li>Joggers</li>
                <li>Compression</li>
                <li>Oversized T-shirt</li>
                <li>Tank Top</li>
              </ul>
            </div>

            <div>
              <h3>Suggestions</h3>
              <div className="suggestions">
                {suggestions.map((item) => (
                  <div key={item.name} className="suggestion-card">
                    <div className="product-thumb"></div>
                    <div>
                      <p className="item-name">{item.name}</p>
                      <p className="item-price">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}