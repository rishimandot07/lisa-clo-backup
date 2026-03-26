import React, { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import "./App.css";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Lisa</h1>
        </div>
      </header>

      {/* Sidebar Section */}
      <div className="sidebar-section">
        <div className="hamburger" onClick={toggleSidebar}>
          <FaBars />
        </div>

        <div className="search-icon">
          <FaSearch />
        </div>
      </div>

      <div className="app">
        {/* Overlay (click anywhere to close) */}
        {isOpen && <div className="overlay" onClick={closeSidebar}></div>}

        {/* Sidebar */}
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Main Content */}
        <main className="content">
          <p>Welcome to Our Store</p>
        </main>
      </div>
    </>
  );
}