import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import heroImage from "../assets/stock.svg";

const Hero = () => {
  useEffect(() => {
    // Set square image height on desktop
    const setSquareImageHeight = () => {
      const heroSection = document.querySelector(".custom-hero");
      if (!heroSection) return;

      const contentElement = heroSection.querySelector(".custom-hero__content");
      const imageWrapper = heroSection.querySelector(
        ".custom-hero__image-wrapper",
      );

      if (window.innerWidth > 768) {
        // On desktop: Make image wrapper same height as content
        if (contentElement && imageWrapper) {
          const contentHeight = (contentElement as HTMLElement).offsetHeight;
          (imageWrapper as HTMLElement).style.height = `${contentHeight}px`;

          // Adjust aspect ratio
          if (contentHeight > 0) {
            (imageWrapper as HTMLElement).style.aspectRatio = "auto";
          }
        }
      } else {
        // On mobile: Set to a square aspect ratio
        if (imageWrapper) {
          (imageWrapper as HTMLElement).style.height = "auto";
          (imageWrapper as HTMLElement).style.aspectRatio = "1";
        }
      }
    };

    // Run on load and resize
    setSquareImageHeight();
    window.addEventListener("resize", setSquareImageHeight);

    // Also run after a short delay to handle any dynamic content loading
    setTimeout(setSquareImageHeight, 500);
  }, []);

  return (
    <section className="custom-hero section-template--25996907217240__new_hero_tq9qtW">
      <div className="custom-hero__container">
        <div className="custom-hero__flex custom-hero__flex--image-right">
          {/* Product Image */}
          <div
            className="custom-hero__image-wrapper"
            style={{ height: "auto", aspectRatio: "1 / 1" }}
          >
            <img
              src={heroImage}
              width="800"
              height="800"
              loading="lazy"
              className="custom-hero__image"
              alt="Mello Santa Product"
            />
          </div>

          {/* Product Content */}
          <div className="custom-hero__content">
            <div className="custom-hero__content-wrapper">
              {/* Rating */}
              <div
                className="custom-hero__rating-wrapper"
                data-block-id="rating_QwgnAk"
              >
                <div className="custom-hero__rating-container">
                  <div className="custom-hero__profile-images">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
                      alt="Profile Image"
                      width="24"
                      height="24"
                      loading="lazy"
                      className="custom-hero__profile-image"
                    />
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sara"
                      alt="Profile Image"
                      width="24"
                      height="24"
                      loading="lazy"
                      className="custom-hero__profile-image"
                    />
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maja"
                      alt="Profile Image"
                      width="24"
                      height="24"
                      loading="lazy"
                      className="custom-hero__profile-image"
                    />
                  </div>
                  <div className="custom-hero__rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="hero-star-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5245 3.46353C11.6741 3.00287 12.3259 3.00287 12.4755 3.46353L14.1329 8.56434C14.1998 8.77035 14.3918 8.90983 14.6084 8.90983H19.9717C20.4561 8.90983 20.6575 9.52964 20.2656 9.81434L15.9266 12.9668C15.7514 13.0941 15.678 13.3198 15.745 13.5258L17.4023 18.6266C17.552 19.0873 17.0248 19.4704 16.6329 19.1857L12.2939 16.0332C12.1186 15.9059 11.8814 15.9059 11.7061 16.0332L7.3671 19.1857C6.97524 19.4704 6.448 19.0873 6.59768 18.6266L8.25503 13.5258C8.32197 13.3198 8.24864 13.0941 8.07339 12.9668L3.73438 9.81434C3.34253 9.52964 3.54392 8.90983 4.02828 8.90983H9.39159C9.6082 8.90983 9.80018 8.77035 9.86712 8.56434L11.5245 3.46353Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    ))}
                  </div>
                  <div className="custom-hero__rating-text">
                    <p>
                      <strong>4.7/5</strong> baserat på +3,475 recensioner
                    </p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h2
                className="custom-hero__title section-heading"
                data-block-id="heading_b3enYM"
              >
                Fylligare hår <br />
                på{" "}
                <span className="section-accent-text custom-hero-accent no-gradient">
                  30 sekunder!
                </span>
              </h2>

              {/* Subtitle */}
              <div
                className="custom-hero__subtitle"
                data-block-id="subtitle_4DbHBw"
              >
                <p>Bli en del av 11.740+ nöjda kunder</p>
              </div>

              {/* Button */}
              <div
                className="custom-hero__button-wrapper"
                data-block-id="button_ee48LN"
              >
                <Link
                  to="/product"
                  className="theme-button custom-hero__button button-gradient-effect gradient-shine-enabled"
                >
                  Prova riskfritt
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
