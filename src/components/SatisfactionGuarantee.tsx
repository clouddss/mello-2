import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SatisfactionGuarantee.css";
import stockImage from "../assets/stock.svg";

interface SatisfactionGuaranteeProps {
  onAddToCart?: () => void;
}

const SatisfactionGuarantee: React.FC<SatisfactionGuaranteeProps> = ({
  onAddToCart,
}) => {
  const location = useLocation();
  const isProductPage = location.pathname === "/product";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isProductPage && onAddToCart) {
      e.preventDefault();
      onAddToCart();
    }
    // If on home page, Link will handle navigation naturally
  };

  return (
    <section
      id="shopify-section-template--26436321640792__satisfaction_guarantee_J4ypTy"
      className="shopify-section guarantee-section"
    >
      <div className="guarantee-section__wrapper page-fade-in">
        <div className="guarantee-section__container">
          {/* Polaroid Photos Area */}
          <div className="guarantee-section__photos">
            <div className="polaroid-photo polaroid-photo-2">
              <img src={stockImage} alt="Hair Filler result" loading="lazy" />
            </div>
            <div className="polaroid-photo polaroid-photo-1">
              <img src={stockImage} alt="Hair Filler result" loading="lazy" />
            </div>
            <div className="polaroid-photo polaroid-photo-3">
              <img src={stockImage} alt="Hair Filler result" loading="lazy" />
            </div>
          </div>

          {/* Icon Area */}
          <div className="shield-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 16L4.35009 13.3929C2.24773 11.8912 1 9.46667 1 6.88306V3L8 0L15 3V6.88306C15 9.46667 13.7523 11.8912 11.6499 13.3929L8 16ZM12.2071 5.70711L10.7929 4.29289L7 8.08579L5.20711 6.29289L3.79289 7.70711L7 10.9142L12.2071 5.70711Z"
              ></path>
            </svg>
          </div>

          {/* Heading Area */}
          <h2 className="guarantee-section__heading">
            <span className="accent-text">100% Pengar tillbaka</span>
            <span className="heading-main">Garanti</span>
          </h2>

          {/* Description Area */}
          <p className="guarantee-section__description">
            Vi är så övertygade om kvaliteten på våra produkter att vi erbjuder
            en nöjdhetsgaranti. Om du inte är nöjd med ditt köp kan du helt
            enkelt returnera varan inom 30 dagar för att få full återbetalning.
          </p>

          {/* CTA Button */}
          <Link
            to="/product"
            className="guarantee-section__cta"
            onClick={handleClick}
          >
            Prova riskfritt
          </Link>

          {/* Benefits Area */}
          <div className="guarantee-section__benefits">
            <div className="benefit">
              <svg
                className="checkmark-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Fylligare hår på 30 sek
            </div>
            <div className="benefit">
              <svg
                className="checkmark-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Sitter hela dagen
            </div>
            <div className="benefit">
              <svg
                className="checkmark-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Resultat som syns!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SatisfactionGuarantee;
