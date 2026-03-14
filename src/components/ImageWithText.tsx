import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ImageWithText.css";
import coupleImage from "../assets/stock.svg";

interface BulletItem {
  text: string;
}

const bulletPoints: BulletItem[] = [
  { text: "Omedelbar skillnad redan efter 30 sekunder" },
  { text: "Enkel och smidig användning - inget kladd eller spill" },
  { text: "Perfekt för att dölja glesa områden och utväxt" },
  { text: "Naturligt resultat som sitter i vind och regn" },
  { text: "100 % nöjdhetsgaranti – eller pengarna tillbaka" }
];

interface ImageWithTextProps {
  onAddToCart?: () => void;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({ onAddToCart }) => {
  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (!onAddToCart) return;
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute("href");
      
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        onAddToCart();
        
        const targetElement = document.querySelector(targetId) || document.getElementById("product-main");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    const scrollButtons = document.querySelectorAll('.js-scroll-to-products');
    scrollButtons.forEach(button => button.addEventListener("click", handleScroll));

    return () => {
      scrollButtons.forEach(button => button.removeEventListener("click", handleScroll));
    };
  }, [onAddToCart]);

  return (
    <section className="shopify-section image-with-text-section">
      <div className="image-text-container page-fade-in">
        <div className="image-text-content">
          <div className="media-column">
            <img
              src={coupleImage}
              alt="Mello Hair Filler Lifestyle"
              className="main-image"
              loading="lazy"
            />
          </div>

          <div className="text-column">
            <h2 className="image-text-heading">
              Fylligare hår{" "}
              <span className="accent-text">utan krångel - varje dag</span>
            </h2>

            <p className="image-text-subtitle">
              Få ett naturligt och fylligt resultat på bara några sekunder med Mello Hair Filler.
              Döljer effektivt tunnhårighet och ger dig självförtroendet tillbaka direkt.
            </p>

            <ul className="image-text-bullet-list">
              {bulletPoints.map((point, index) => (
                <li key={index} className="list-item">
                  <div className="item-icon">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1" />
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                  <div className="item-text">{point.text}</div>
                </li>
              ))}
            </ul>

            <div className="button-container">
              {onAddToCart ? (
                <a
                  href="#product-main"
                  className="button js-scroll-to-products button-gradient-effect"
                >
                  PROVA RISKFRITT
                </a>
              ) : (
                <Link
                  to="/product"
                  className="button button-gradient-effect"
                >
                  PROVA RISKFRITT
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageWithText;
