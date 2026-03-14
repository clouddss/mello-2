import React from "react";
import "./CustomerReviews.css";

import stockImage from "../assets/stock.svg";

const reviewImages = [
  stockImage,
  stockImage,
  stockImage,
  stockImage,
  stockImage,
  stockImage,
  stockImage,
];

const StarIcon: React.FC = () => (
  <svg
    width="15px"
    height="15px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5245 3.46353C11.6741 3.00287 12.3259 3.00287 12.4755 3.46353L14.1329 8.56434C14.1998 8.77035 14.3918 8.90983 14.6084 8.90983H19.9717C20.4561 8.90983 20.6575 9.52964 20.2656 9.81434L15.9266 12.9668C15.7514 13.0941 15.678 13.3198 15.745 13.5258L17.4023 18.6266C17.552 19.0873 17.0248 19.4704 16.6329 19.1857L12.2939 16.0332C12.1186 15.9059 11.8814 15.9059 11.7061 16.0332L7.3671 19.1857C6.97524 19.4704 6.448 19.0873 6.59768 18.6266L8.25503 13.5258C8.32197 13.3198 8.24864 13.0941 8.07339 12.9668L3.73438 9.81434C3.34253 9.52964 3.54392 8.90983 4.02828 8.90983H9.39159C9.6082 8.90983 9.80018 8.77035 9.86712 8.56434L11.5245 3.46353Z"
      fill="rgba(9, 236, 138, 1)"
    ></path>
  </svg>
);

const CustomerReviews: React.FC = () => {
  // Duplicate images multiple times to ensure enough track length for any screen
  const imageList = [
    ...reviewImages,
    ...reviewImages,
    ...reviewImages,
    ...reviewImages,
    ...reviewImages,
    ...reviewImages,
  ];

  return (
    <section
      id="shopify-section-template--26436321640792__customer_reviews_RETVY9"
      className="shopify-section"
    >
      <div className="reviews-section-outer page-fade-in">
        <div className="new-section">
          <div className="review-carousel-container">
            <div className="review-carousel-track">
              {imageList.map((image, index) => (
                <div className="review-carousel-item" key={index}>
                  <img
                    src={image}
                    alt=""
                    className="review-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="content-wrapper">
            <div className="rating-section" style={{ paddingTop: "5px" }}>
              <div className="star-icons">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <div
                className="rating-text"
                style={{ color: "#121212", marginTop: "5px" }}
              >
                4,7/5&nbsp;baserat på&nbsp;+3,475 recensioner
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
