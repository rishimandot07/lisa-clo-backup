import React, { useEffect, useMemo, useState } from "react";
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
import womenImageOne from "../assets/Women's Collection/img1.jpg";
import womenImageTwo from "../assets/Women's Collection/img2.jpg";
import womenImageThree from "../assets/Women's Collection/img3.jpg";
import womenImageFour from "../assets/Women's Collection/img4.jpg";
import womenImageFive from "../assets/Women's Collection/img5.jpg";
import genzImageOne from "../assets/Gen Z Collection's/img1.jpg";
import genzImageTwo from "../assets/Gen Z Collection's/img2.jpg";
import genzImageThree from "../assets/Gen Z Collection's/img3.jpg";
import genzImageFour from "../assets/Gen Z Collection's/img4.jpg";
import genzImageFive from "../assets/Gen Z Collection's/img5.jpg";
import { useNavigate } from "react-router-dom";
import { apiPath, resolveMediaUrl } from "../config/api";

export default function Home() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    fetch(apiPath("/api/products"))
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = useMemo(() => {
    if (searchQuery.trim() === "") return [];
    const q = searchQuery.toLowerCase().replace(/[^a-z0-9]/g, "");
    return allProducts.filter((p) =>
      p.name.toLowerCase().replace(/[^a-z0-9]/g, "").includes(q)
    );
  }, [searchQuery, allProducts]);

  const slides = [slideOne, slideTwo, slideThree,slideFour];
  
  const womenRepeatedImages = [
    womenImageOne,
    womenImageTwo,
    womenImageThree,
    womenImageFour,
    womenImageFive,
    womenImageThree
  ];
  const genzRepeatedImages = [
    genzImageOne,
    genzImageTwo,
    genzImageThree,
    genzImageFour,
    genzImageFive,
    genzImageTwo
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

const menProducts = allProducts.filter((p) => p.category === "men");
const womenProducts = allProducts.filter((p) => p.category === "women");
const genzProducts = allProducts.filter((p) => p.category === "genz");

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
              <Link to="/category/men/polo">Polo T-Shirts</Link>
              <Link to="/category/men/oversized">Men's Oversized T-Shirts</Link>
              <Link to="/category/men/regular">Men's Regular Fit</Link>
              <Link to="/category/men/hoodie">Men's Hoodies</Link>
              <Link to="/category/men/jeans">Men's Jeans</Link>
            </div>
          </div>

          <div className="nav-item">
            <button className="category-btn">Women</button>
            <div className="dropdown-menu">
              <Link to="/category/women/tshirts">Women's T-Shirts</Link>
              <Link to="/category/women/crop-tops">Women's Crop Tops</Link>
              <Link to="/category/women/oversized">Women's Oversized T-Shirts</Link>
              <Link to="/category/women/hoodies">Women's Hoodies</Link>
              <Link to="/category/women/bottoms">Women's Bottoms</Link>
            </div>
          </div>

          <div className="nav-item">
            <button className="category-btn">Gen Z</button>
              <div className="dropdown-menu">
                <Link to="/category/genz/oversized">Oversized T-Shirts</Link>
                <Link to="/category/genz/joggers">Joggers</Link>
                <Link to="/category/genz/baggy-jeans">Baggy Jeans</Link>
                <Link to="/category/genz/hoodies">Hoodies</Link>
                <Link to="/category/genz/baggy-shirts">Baggy Shirts</Link>
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
          <Link to="/wishlist" className="icon-btn" aria-label="Go to wishlist">
            <FaRegHeart />
          </Link>
          <Link to="/cart" className="icon-btn" aria-label="Go to cart">
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

        <section className="collection-section">
          <h2 className="collection-title">Men&apos;s Collection</h2>
          <div className="collection-shell">
            <button
              className="collection-arrow left"
              type="button"
              aria-label="Previous items in men's collection"
              onClick={() => scrollCollection("men-collection", "left")}
            >
              <FaChevronLeft />
            </button>
    <div id="men-collection" className="collection-row">
  {menProducts && menProducts.length > 0 ? (
    menProducts.map((product) => (
      <article
  className="collection-card"
  key={product._id}
  onClick={() =>
 navigate(`/category/men/${product.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`)
}
  style={{ cursor: "pointer" }}
>
        <div className="image-wrapper">
          <img
            className="collection-image"
            src={resolveMediaUrl(product.image)}
            alt={product.name}
          />
        </div>
        <p className="product-name">{product.name}</p>
      </article>
    ))
  ) : (
    <p style={{ padding: "20px" }}>Loading...</p>
  )}
</div>
            <button
              className="collection-arrow right"
              type="button"
              aria-label="Next items in men's collection"
              onClick={() => scrollCollection("men-collection", "right")}
            >
              <FaChevronRight />
            </button>
          </div>
        </section>

        <section className="collection-section">
          <h2 className="collection-title">Women&apos;s Collection</h2>
          <div className="collection-shell">
            <button
              className="collection-arrow left"
              type="button"
              aria-label="Previous items in women's collection"
              onClick={() => scrollCollection("women-collection", "left")}
            >
              <FaChevronLeft />
            </button>
            <div id="women-collection" className="collection-row">
            {womenProducts.length > 0 ? (
              womenProducts.map((product) => (
                <article
                  className="collection-card"
                  key={product._id}
                  onClick={() =>
                    navigate(
                      `/category/women/${product.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="image-wrapper">
                    <img
                      className="collection-image"
                      src={resolveMediaUrl(product.image)}
                      alt={product.name}
                    />
                  </div>
                  <p className="product-name">{product.name}</p>
                </article>
              ))
            ) : (
              womenRepeatedImages.map((image, index) => (
                <article className="collection-card" key={`women-${index}`}>
                  <img src={image} alt={`Women collection ${index + 1}`} />
                </article>
              ))
            )}
            </div>
            <button
              className="collection-arrow right"
              type="button"
              aria-label="Next items in women's collection"
              onClick={() => scrollCollection("women-collection", "right")}
            >
              <FaChevronRight />
            </button>
          </div>
        </section>

        <section className="collection-section">
          <h2 className="collection-title">Gen Z Collection</h2>
          <div className="collection-shell">
            <button
              className="collection-arrow left"
              type="button"
              aria-label="Previous items in Gen Z collection"
              onClick={() => scrollCollection("genz-collection", "left")}
            >
              <FaChevronLeft />
            </button>
            <div id="genz-collection" className="collection-row">
            {genzProducts.length > 0 ? (
              genzProducts.map((product) => (
                <article
                  className="collection-card"
                  key={product._id}
                  onClick={() =>
                    navigate(
                      `/category/genz/${product.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="image-wrapper">
                    <img
                      className="collection-image"
                      src={resolveMediaUrl(product.image)}
                      alt={product.name}
                    />
                  </div>
                  <p className="product-name">{product.name}</p>
                </article>
              ))
            ) : (
              genzRepeatedImages.map((image, index) => (
                <article className="collection-card" key={`genz-${index}`}>
                  <img src={image} alt={`GenZ collection ${index + 1}`} />
                </article>
              ))
            )}
            </div>
            <button
              className="collection-arrow right"
              type="button"
              aria-label="Next items in Gen Z collection"
              onClick={() => scrollCollection("genz-collection", "right")}
            >
              <FaChevronRight />
            </button>
          </div>
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
  placeholder="Search products..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      navigate(`/category/all/${searchQuery}`);
      setIsSearchOpen(false);
    }
  }}
/>
  <FaSearch />

          </div>

          <div className="search-grid">
            <div>
              <h3>Popular categories</h3>
              <ul className="category-list">
  {filteredProducts.map((item) => (
    <li
      key={item._id}
      onClick={() =>
        navigate(
          `/category/${item.category}/${item.name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "")}`
        )
      }
    >
      {item.name}
    </li>
  ))}
</ul>
            </div>

            <div>
              <h3>Suggestions</h3>
              <div className="suggestions">
                {filteredProducts.map((item) => (
                  <div
  key={item._id}
  className="suggestion-card"
  onClick={() =>
    navigate(
      `/category/${item.category}/${item.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")}`
    )
  }
  style={{ cursor: "pointer" }}
>
                    <img
  className="product-thumb"
  src={resolveMediaUrl(item.image)}
  alt={item.name}
/>
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