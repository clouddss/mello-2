import React, { useEffect, useRef, useState } from "react";
import "./BeforeAfter.css";
import beforeImageSrc from "../assets/stock.svg";
import afterImageSrc from "../assets/stock.svg";

const BeforeAfter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeImageRef = useRef<HTMLDivElement>(null);
  const sliderLineRef = useRef<HTMLDivElement>(null);
  const sliderButtonRef = useRef<HTMLDivElement>(null);

  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const beforeImage = beforeImageRef.current;
    const sliderLine = sliderLineRef.current;
    const sliderButton = sliderButtonRef.current;

    if (!container || !beforeImage || !sliderLine || !sliderButton) return;

    function updatePosition(percentage: number) {
      const clamped = Math.max(0, Math.min(100, percentage));
      setSliderPosition(clamped);
      beforeImage!.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
      sliderLine!.style.left = `${clamped}%`;
      sliderButton!.style.left = `${clamped}%`;
    }

    function getPosition(e: MouseEvent | TouchEvent) {
      const rect = container!.getBoundingClientRect();
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const offsetX = clientX - rect.left;
      return (offsetX / rect.width) * 100;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updatePosition(getPosition(e));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      updatePosition(getPosition(e));
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, percentage));
    setSliderPosition(clamped);
    if (beforeImageRef.current)
      beforeImageRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    if (sliderLineRef.current) sliderLineRef.current.style.left = `${clamped}%`;
    if (sliderButtonRef.current)
      sliderButtonRef.current.style.left = `${clamped}%`;
  };

  return (
    <section className="shopify-section section before-after-comparison">
      <div className="before-after-section page-fade-in">
        <div className="page-width">
          <div className="before-after-container contained">
            <div className="image-comparison-container">
              <h2 className="comparison-title">
                Se resultaten{" "}
                <span className="accent-text global-accent-text">
                  med egna ögon
                </span>
              </h2>
              <p className="comparison-description">
                Se den märkbara skillnaden som våra kunder upplever direkt efter
                applicering av Mello Hair Filler. Dra för att
                jämföra.
              </p>

              <div
                className="slider-container"
                ref={containerRef}
                onClick={handleContainerClick}
                role="region"
                aria-label="Image comparison slider"
              >
                <div className="after-image">
                  <img src={afterImageSrc} alt="Efter" loading="lazy" />
                  <div className="image-label label-after">Efter</div>
                </div>

                <div
                  className="before-image"
                  ref={beforeImageRef}
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                >
                  <img src={beforeImageSrc} alt="Före" loading="lazy" />
                  <div className="image-label label-before">Före</div>
                </div>

                <div
                  className="comparison-divider-line"
                  ref={sliderLineRef}
                  style={{ left: "50%" }}
                ></div>

                <div
                  className="slider-button"
                  ref={sliderButtonRef}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  style={{ left: "50%" }}
                  role="slider"
                  tabIndex={0}
                  aria-valuenow={sliderPosition}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Image comparison slider control"
                >
                  <svg
                    className="slider-icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 5L5 8M5 8L8 11M5 8H13M16 13L19 16M19 16L16 19M19 16H11"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="slider-instructions">
                Dra för att se skillnaden. <br />
                Resultat kan variera mellan individer.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
