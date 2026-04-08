import React, { useEffect, useState } from "react";
import Collections from "../components/Collections";
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

import logo from "../assets/logo.png";
import slideOne from "../assets/homescreen/img1.jpg";
import slideTwo from "../assets/homescreen/img2.png";
import slideThree from "../assets/homescreen/img3.png";
import slideFour from "../assets/homescreen/img4.png";
import menImageOne from "../assets/Men's Collection/3e3b1e0731bd0214689d5761effc2e5f.jpg";
import menImageTwo from "../assets/Men's Collection/58cb38ae13a312ac83b8810624550a38.jpg";
import menImageThree from "../assets/Men's Collection/bc8f2c1f855a92997f7e3f275afaa733.jpg";
import womenImageOne from "../assets/Women's Collection/1eeaea48003b982da692a74822aeef07.jpg";
import womenImageTwo from "../assets/Women's Collection/21ab5b5a0ba35f90c51a4119f61a6fa1.jpg";
import womenImageThree from "../assets/Women's Collection/4325e96e149af54b55c025a0b309b688.jpg";
import genzImageOne from "../assets/Gen Z Collection's/35987c374bb954361b11c09199e3f3de.jpg";
import genzImageTwo from "../assets/Gen Z Collection's/73f4f1551f666363dae473329961b0f9.jpg";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [slideOne, slideTwo, slideThree,slideFour];
  const menRepeatedImages = [
    menImageOne,
    menImageTwo,
    menImageThree,
    menImageOne,
    menImageTwo,
    menImageThree,
    menImageOne,
    menImageTwo,
    menImageThree,
  ];
  const womenRepeatedImages = [
    womenImageOne,
    womenImageTwo,
    womenImageThree,
    womenImageOne,
    womenImageTwo,
    womenImageThree,
    womenImageOne,
    womenImageTwo,
    womenImageThree,
  ];
  const genzRepeatedImages = [
    genzImageOne,
    genzImageTwo,
    genzImageOne,
    genzImageTwo,
    genzImageOne,
    genzImageTwo,
    genzImageOne,
    genzImageTwo,
    genzImageOne,
  ];

  const suggestions = [
    { name: "Everyday Joggers", price: "₹. 1,199.00" },
    { name: "Oversized T-Shirt", price: "₹. 999.00" },
    { name: "Performance Hoodie", price: "₹. 1,499.00" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollCollection = (rowId, direction) => {
  const row = document.getElementById(rowId);
  if (!row) return;

  const card = row.querySelector(".collection-card");
  if (!card) return;

  const cardWidth = card.offsetWidth + 14; // include gap

  row.scrollBy({
    left: direction === "left" ? -cardWidth : cardWidth,
    behavior: "smooth",
  });
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
          <Link to="/">
            <img src={logo} alt="Lisa Logo" className="logo" />
          </Link>
        </div>

        <nav className="center-nav" aria-label="Categories">
          <div className="nav-item">
            <button className="category-btn">Men</button>
            <div className="dropdown-menu">
              <Link to="/men/polo">Polo T-Shirts</Link>
              <Link to="/men/oversized">Men's Oversized T-Shirts</Link>
              <Link to="/men/regular">Men's Regular Fit</Link>
              <Link to="/men/hoodie">Men's Hoddies</Link>
              <Link to="/men/jeans">Men's Jeans</Link>
            </div>
          </div>

          <div className="nav-item">
            <button className="category-btn">Women</button>
            <div className="dropdown-menu">
              <Link to="/women/tshirts">Women's T-Shirts</Link>
              <Link to="/women/crop-tops">Women's Crop Tops</Link>
              <Link to="/women/oversized">Women's Oversized T-Shirts</Link>
              <Link to="/women/hoodies">Women's Hoodies</Link>
              <Link to="/women/bottoms">Women's Bottoms</Link>
            </div>
          </div>

          <div className="nav-item">
            <button className="category-btn">Gen Z</button>
              <div className="dropdown-menu">
                <Link to="/genz/oversized">Oversized T-Shirts</Link>
                <Link to="/genz/joggers">Joggers</Link>
                <Link to="/genz/baggy-jeans">Baggy Jeans</Link>
                <Link to="/genz/hoodies">Hoodies</Link>
                <Link to="/genz/baggy-shirts">Baggy Shirts</Link>
              </div>
          </div>
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
          <Link to="/Wishlist" className="icon-btn" aria-label="Go to wishlist">
            <FaRegHeart />
          </Link>
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

        <Collections
        menImages={menRepeatedImages}
        womenImages={womenRepeatedImages}
        genzImages={genzRepeatedImages}
        scrollCollection={scrollCollection}
        />
      
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