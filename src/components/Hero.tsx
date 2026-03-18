import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import heroImage from "../assets/stock.svg";

const Hero = () => {
  useEffect(() => {
    const syncImageHeight = () => {
      const content = document.querySelector(".custom-hero__content") as HTMLElement | null;
      const imageWrapper = document.querySelector(".custom-hero__image-wrapper") as HTMLElement | null;
      if (!content || !imageWrapper) return;

      if (window.innerWidth > 768) {
        imageWrapper.style.height = `${content.offsetHeight}px`;
        imageWrapper.style.aspectRatio = "auto";
      } else {
        imageWrapper.style.height = "auto";
        imageWrapper.style.aspectRatio = "1";
      }
    };

    syncImageHeight();
    window.addEventListener("resize", syncImageHeight);
    const timer = setTimeout(syncImageHeight, 500);
    return () => {
      window.removeEventListener("resize", syncImageHeight);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="custom-hero">
      <div className="custom-hero__container">
        <div className="custom-hero__flex custom-hero__flex--image-right">

          {/* Image */}
          <div className="custom-hero__image-wrapper">
            <img
              src={heroImage}
              width="800"
              height="800"
              loading="lazy"
              className="custom-hero__image"
              alt="Mello Santa Product"
            />
          </div>

          {/* Content */}
          <div className="custom-hero__content">
            <div className="custom-hero__content-wrapper">

              {/* Social proof pill */}
              <div className="custom-hero__rating-wrapper">
                <div className="custom-hero__rating-container">
                  <div className="custom-hero__profile-images">
                    {["Emma", "Sara", "Maja"].map((seed) => (
                      <img
                        key={seed}
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                        alt="Customer"
                        width="24"
                        height="24"
                        loading="lazy"
                        className="custom-hero__profile-image"
                      />
                    ))}
                  </div>
                  <div className="custom-hero__rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="hero-star-icon"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5245 3.46353C11.6741 3.00287 12.3259 3.00287 12.4755 3.46353L14.1329 8.56434C14.1998 8.77035 14.3918 8.90983 14.6084 8.90983H19.9717C20.4561 8.90983 20.6575 9.52964 20.2656 9.81434L15.9266 12.9668C15.7514 13.0941 15.678 13.3198 15.745 13.5258L17.4023 18.6266C17.552 19.0873 17.0248 19.4704 16.6329 19.1857L12.2939 16.0332C12.1186 15.9059 11.8814 15.9059 11.7061 16.0332L7.3671 19.1857C6.97524 19.4704 6.448 19.0873 6.59768 18.6266L8.25503 13.5258C8.32197 13.3198 8.24864 13.0941 8.07339 12.9668L3.73438 9.81434C3.34253 9.52964 3.54392 8.90983 4.02828 8.90983H9.39159C9.6082 8.90983 9.80018 8.77035 9.86712 8.56434L11.5245 3.46353Z"
                          fill="currentColor"
                        />
                      </svg>
                    ))}
                  </div>
                  <div className="custom-hero__rating-text">
                    <p><strong>4.7/5</strong> baserat på +3 475 recensioner</p>
                  </div>
                </div>
              </div>

              {/* Headline */}
              <h2 className="custom-hero__title">
                Fylligare hår{" "}
                <br />
                på{" "}
                <span className="custom-hero-accent">30 sekunder!</span>
              </h2>

              {/* Subtitle */}
              <div className="custom-hero__subtitle">
                <p>Bli en del av 11 740+ nöjda kunder</p>
              </div>

              {/* CTA */}
              <div className="custom-hero__button-wrapper">
                <Link to="/product" className="custom-hero__button">
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
