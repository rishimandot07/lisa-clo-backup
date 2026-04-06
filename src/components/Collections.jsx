import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Collections({
  menImages,
  womenImages,
  genzImages,
  scrollCollection,
}) {
  // 🔥 CATEGORY NAMES
  const menTitles = [
    "Men's Gym Oversized",
    "Acid Washed T-Shirt",
    "Men's Regular",
    "Men's Oversized",
    "Men's Hoodie",
    "Men's Polo",
  ];

  const womenTitles = [
    "Women's Regular",
    "Women's Oversized",
    "Women's Sweatshirt",
    "Women's Hoodie",
    "Women's Polo",
    "Women's T-Shirt",
  ];

  const genzTitles = [
    "GenZ Oversized",
    "GenZ Streetwear",
    "GenZ Graphic Tees",
    "GenZ Hoodies",
    "GenZ Casual",
    "GenZ Trendy",
  ];

  return (
    <>
      {/* ================= MEN ================= */}
      <section className="collection-section">
        <h2 className="collection-title">Men&apos;s Collection</h2>

        <div className="collection-shell">
          <button
            className="collection-arrow left"
            onClick={() => scrollCollection("men-collection", "left")}
          >
            <FaChevronLeft />
          </button>

          <div id="men-collection" className="collection-row">
            {menImages.slice(0, 6).map((image, index) => (
              <article className="collection-card" key={`men-${index}`}>
  <div className="card-image">
    <img src={image} alt={menTitles[index]} />
  </div>

  <div className="card-footer">
    <p>{menTitles[index]}</p>
  </div>
</article>
            ))}
          </div>

          <button
            className="collection-arrow right"
            onClick={() => scrollCollection("men-collection", "right")}
          >
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* ================= WOMEN ================= */}
      <section className="collection-section">
        <h2 className="collection-title">Women&apos;s Collection</h2>

        <div className="collection-shell">
          <button
            className="collection-arrow left"
            onClick={() => scrollCollection("women-collection", "left")}
          >
            <FaChevronLeft />
          </button>

          <div id="women-collection" className="collection-row">
  {womenImages.slice(0, 6).map((image, index) => (
    <article className="collection-card" key={`women-${index}`}>
      <div className="card-image">
        <img src={image} alt={womenTitles[index]} />
      </div>

      <div className="card-footer">
        <p>{womenTitles[index]}</p>
      </div>
    </article>
  ))}
</div>

          <button
            className="collection-arrow right"
            onClick={() => scrollCollection("women-collection", "right")}
          >
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* ================= GEN Z ================= */}
      <section className="collection-section">
        <h2 className="collection-title">Gen Z Collection</h2>

        <div className="collection-shell">
          <button
            className="collection-arrow left"
            onClick={() => scrollCollection("genz-collection", "left")}
          >
            <FaChevronLeft />
          </button>

          <div id="genz-collection" className="collection-row">
  {genzImages.slice(0, 6).map((image, index) => (
    <article className="collection-card" key={`genz-${index}`}>
      <div className="card-image">
        <img src={image} alt={genzTitles[index]} />
      </div>

      <div className="card-footer">
        <p>{genzTitles[index]}</p>
      </div>
    </article>
  ))}
</div>

          <button
            className="collection-arrow right"
            onClick={() => scrollCollection("genz-collection", "right")}
          >
            <FaChevronRight />
          </button>
        </div>
      </section>
    </>
  );
}