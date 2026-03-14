import React from "react";
import "./Carousel.css";
import stockImage from "../assets/stock.svg";

const Carousel: React.FC = () => {
  const images = [
    stockImage,
    stockImage,
    stockImage,
    stockImage,
    stockImage,
    stockImage,
  ];

  // Duplicate images for seamless scrolling
  const imageList = [...images, ...images];

  return (
    <div className="review-carousel-section">
      <div className="carousel-mask">
        <div className="carousel-track-container">
          <div className="carousel-track">
            {imageList.map((src, index) => (
              <div className="carousel-item" key={index}>
                <img
                  src={src}
                  alt={`Review ${index % images.length}`}
                  className="review-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
