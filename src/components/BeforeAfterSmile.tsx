import React, { useEffect, useRef, useState } from 'react';
import './BeforeAfterSmile.css';

const BeforeAfterSmile: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      updateSliderPosition(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      updateSliderPosition(e.touches[0].clientX);
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    // If it's a mouse event, prevent default to avoid selection issues
    if ('button' in e && e.button !== 0) return;
    setIsDragging(true);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    updateSliderPosition(e.clientX);
  };

  return (
    <section className="shopify-section section before-after-section-smile">
      <div className="before-after-section page-fade-in" style={{ backgroundColor: '#ffffff' }}>
        <div className="page-width">
          <div className="before-after-container">
            <div className="image-comparison-container">
              <h2 className="comparison-title">
                Omedelbara <span className="accent-text global-accent-text">Resultat</span>
              </h2>
              <p className="comparison-description">Synligt resultat efter första användningen!</p>

              <div 
                className="slider-container" 
                ref={containerRef}
                onMouseDown={handleContainerClick}
                onTouchStart={(e) => {
                  setIsDragging(true);
                  updateSliderPosition(e.touches[0].clientX);
                }}
                role="region" 
                aria-label="Image comparison slider"
              >
                <div className="after-image">
                  <img 
                    src="//glacr.se/cdn/shop/files/after_1.png?v=1759235404&width=1200" 
                    alt="Efter" 
                    loading="lazy" 
                    width="1200" 
                    height="1183" 
                  />
                  <div className="image-label label-after">Efter</div>
                </div>

                <div 
                  className="before-image" 
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img 
                    src="//glacr.se/cdn/shop/files/before_1.png?v=1759235382&width=1200" 
                    alt="Före" 
                    loading="lazy" 
                    width="1200" 
                    height="1236" 
                  />
                  <div className="image-label label-before">Före</div>
                </div>

                <div 
                  className="comparison-divider-line" 
                  style={{ left: `${sliderPosition}%` }}
                ></div>

                <div 
                  className={`slider-button ${isDragging ? 'dragging' : ''}`}
                  onMouseDown={handleStart}
                  onTouchStart={handleStart}
                  style={{ left: `${sliderPosition}%` }}
                  role="slider" 
                  tabIndex={0} 
                  aria-valuenow={sliderPosition} 
                  aria-valuemin={0} 
                  aria-valuemax={100} 
                  aria-label="Image comparison slider control"
                >
                  <svg className="slider-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5L5 8M5 8L8 11M5 8H13M16 13L19 16M19 16L16 19M19 16H11" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>

              <div className="slider-instructions">
                Dra för att se skillnaden
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSmile;
