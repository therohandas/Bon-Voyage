import React from "react";
import { motion } from "framer-motion";
import { getImageProps } from "../utils/imageUtils";

export default function FeaturedGrid({ items }) {
  // Get image props with fallback for each item
  const getImgProps = (item) => {
    if (item.slug) {
      return getImageProps(item);
    }
    return {
      src: item.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      onError: (e) => { e.target.src = "/images/locations/placeholder.jpg"; }
    };
  };

  return (
    <section id="featured" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Destinations</h2>
          <a href="/explore" className="section-link">
            View all
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="destination-grid">
          {items.map((d, index) => (
            <motion.a
              key={d.id}
              href={d.href || "#"}
              className="destination-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="destination-image-wrap">
                <img
                  {...getImgProps(d)}
                  alt={d.title}
                  className="destination-image"
                  loading="lazy"
                />
                <div className="destination-image-overlay" />
                {d.rating && (
                  <div className="destination-rating">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    {d.rating}
                  </div>
                )}
              </div>

              <div className="destination-content">
                <h3 className="destination-title">{d.title}</h3>
                <p className="destination-desc">
                  Discover timings, tips, and travel routes for this amazing destination.
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
