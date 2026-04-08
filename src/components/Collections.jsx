import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Collections({
  menImages,
  womenImages,
  genzImages,
  scrollCollection,
}) {

  /* ========= CATEGORY CONFIG ========= */

  const menCategories = [
    { label: "Polo T-Shirts", value: "polo" },
    { label: "Men's Oversized T-Shirts", value: "men-oversized" },
    { label: "Men's Regular Fit", value: "regular" },
    { label: "Men's Hoddies", value: "men-hoodie" },
    { label: "Men's Jeans", value: "jeans" }
  ];

  const womenCategories = [
    { label: "Women's T-Shirts", value: "tshirts" },
    { label: "Women's Crop Tops", value: "crop-top" },
    { label: "Women's Oversized T-Shirts", value: "women-oversized" },
    { label: "Women's Hoodies", value: "women-hoodie" },
    { label: "Women's Bottoms", value: "women-bottom" },
  ];

  const genzCategories = [
    { label: "Oversized T-Shirts", value: "oversized" },
    { label: "Joggers", value: "joggers" },
    { label: "Baggy Jeans", value: "baggy-jeans" },
    { label: "Hoodies", value: "hoodies" },
    { label: "Baggy Shirts", value: "baggy-shirts" }
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
            {menImages.slice(0, 6).map((image, index) => {
              const category =
                menCategories[index % menCategories.length];

              return (
                <Link
                  to={`/men/${category.value}`}
                  key={`men-${index}`}
                  className="collection-link"
                >
                  <article className="collection-card">
                    <div className="card-image">
                      <img src={image} alt={category.label} />
                    </div>
                    <div className="card-footer">
                      <p>{category.label}</p>
                    </div>
                  </article>
                </Link>
              );
            })}
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
            {womenImages.slice(0, 6).map((image, index) => {
              const category =
                womenCategories[index % womenCategories.length];

              return (
                <Link
                  to={`/women/${category.value}`}
                  key={`women-${index}`}
                  className="collection-link"
                >
                  <article className="collection-card">
                    <div className="card-image">
                      <img src={image} alt={category.label} />
                    </div>
                    <div className="card-footer">
                      <p>{category.label}</p>
                    </div>
                  </article>
                </Link>
              );
            })}
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
            {genzImages.slice(0, 6).map((image, index) => {
              const category =
                genzCategories[index % genzCategories.length];

              return (
                <Link
                  to={`/genz/${category.value}`}
                  key={`genz-${index}`}
                  className="collection-link"
                >
                  <article className="collection-card">
                    <div className="card-image">
                      <img src={image} alt={category.label} />
                    </div>
                    <div className="card-footer">
                      <p>{category.label}</p>
                    </div>
                  </article>
                </Link>
              );
            })}
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