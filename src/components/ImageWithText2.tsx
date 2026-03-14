import React, { useEffect } from "react";
import "./ImageWithText2.css";
import testemontage from "../assets/stock.svg";
const ImageWithText2: React.FC = () => {
  useEffect(() => {
    // Smooth scroll to products
    const initScrollToProduct = () => {
      const scrollButtons = document.querySelectorAll(
        '.js-scroll-to-products, [data-scroll-to-product="true"]',
      );

      scrollButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = button.getAttribute("href");
          if (!targetId) return;

          let targetElement = document.querySelector(targetId);

          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else {
            const productSelectors = [
              "#MainProduct",
              "#shopify-section-product-template",
              "#shopify-section-product",
              "#product-section",
              ".product-section",
              ".product-template",
              ".product-container",
              ".product-main",
              ".product",
              '[data-section-type="product"]',
              '[data-section-id*="product"]',
            ];

            for (const selector of productSelectors) {
              const el = document.querySelector(selector);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
              }
            }

            const main =
              document.querySelector("main") ||
              document.querySelector("#MainContent");
            if (main) {
              main.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        });
      });
    };

    initScrollToProduct();
  }, []);

  return (
    <section
      id="shopify-section-template--26436321640792__image_with_text_HmTPU4"
      className="shopify-section section"
    >
      <div
        className="image-text-section page-fade-in"
        id="image-text-section-template--26436321640792__image_with_text_HmTPU4"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="image-text-container">
          <div className="image-text-content image-left">
            <div className="media-column">
              <img
                src={testemontage}
                alt="Få en naturlig bränna med Mello Santa"
                className="main-image"
                loading="lazy"
              />
            </div>

            <div className="text-column">
              <h2 className="image-text-heading">
                Skaffa din drömbränna med{" "}
                <span className="accent-text global-accent-text">
                  Mello Santa
                </span>
              </h2>

              <div
                className="subtitle-wrapper"
                data-block-id="subtitle_fx3khb"
                style={{ marginTop: "0px", marginBottom: "0px" }}
              >
                <h3
                  className="image-text-subtitle"
                  style={{
                    color: "#333333",
                    fontSize: "1.5rem",
                    lineHeight: "1.4",
                    letterSpacing: "var(--letter-spacing-body)",
                    margin: "0",
                  }}
                >
                  Få en naturlig och synlig bränna på kort tid.
                  <br /> En enkel och skonsam nässpray utvecklad för ett jämnt
                  resultat – snabbt och utan krångel.
                </h3>
              </div>

              <div
                className="image-text-divider-wrapper"
                id="divider-block-divider_DKitx3"
                data-block-type="divider"
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  clear: "both",
                }}
              >
                <div
                  className="image-text-divider-line"
                  style={{
                    width: "50%",
                    height: "2px",
                    background: "transparent",
                    borderTop: "2px solid #666666",
                    borderRadius: "0px",
                    opacity: "1.0",
                    display: "block",
                    flexShrink: "0",
                  }}
                ></div>
              </div>

              <ul
                className="image-text-bullet-list"
                style={{
                  color: "#333333",
                  marginTop: "0px",
                  marginBottom: "0px",
                }}
              >
                <li className="list-item">
                  <div className="item-icon">
                    <svg viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="currentColor"
                        opacity="0.1"
                      ></circle>
                      <path
                        d="M9 12l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      ></path>
                    </svg>
                  </div>
                  <div className="item-text">
                    Synlig bränna redan efter första användningen
                  </div>
                </li>

                <li className="list-item">
                  <div className="item-icon">
                    <svg viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="currentColor"
                        opacity="0.1"
                      ></circle>
                      <path
                        d="M9 12l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      ></path>
                    </svg>
                  </div>
                  <div className="item-text">
                    Funkar för alla hudtyper – även känsliga
                  </div>
                </li>

                <li className="list-item">
                  <div className="item-icon">
                    <svg viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="currentColor"
                        opacity="0.1"
                      ></circle>
                      <path
                        d="M9 12l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      ></path>
                    </svg>
                  </div>
                  <div className="item-text">Boosta ditt självförtroende</div>
                </li>
              </ul>

              <div
                className="button-container"
                style={{ marginTop: "0px", marginBottom: "0px" }}
              >
                <a
                  href="#shopify-section-template--25997913817432__main"
                  className="button js-scroll-to-products button-section-specific-sizing button-gradient-effect gradient-shine-enabled"
                >
                  Beställ nu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageWithText2;
