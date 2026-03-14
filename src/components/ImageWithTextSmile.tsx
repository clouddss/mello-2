import React from 'react';
import './ImageWithTextSmile.css';

const ImageWithTextSmile: React.FC = () => {
  return (
    <section className="shopify-section section">
      <div className="image-text-section page-fade-in" style={{ backgroundColor: '#ffffff' }}>
        <div className="image-text-container">
          <div className="image-text-content image-left mobile-media-full-width">
            <div className="media-column mobile-full-width">
              <img 
                src="//glacr.se/cdn/shop/files/23947324.gif?v=1736522543&width=1600" 
                alt="Din drömbränna!" 
                className="main-image" 
                loading="lazy" 
              />
            </div>
            
            <div className="text-column">
              <h2 className="image-text-heading">
                Din drömbränna!{' '}
                <span className="accent-text global-accent-text">Snabbt och utan fläckar</span>
              </h2>
              
              <div className="subtitle-wrapper" style={{ marginTop: '0px', marginBottom: '0px' }}>
                <h3 className="image-text-subtitle">
                  Få den bränna du alltid har velat ha, på det bekvämaste sättet någonsin. 
                  Synligt resultat <br/>efter bara en användning.
                </h3>
              </div>
              
              <div className="button-container" style={{ marginTop: '0px', marginBottom: '0px' }}>
                <a 
                  href="/product" 
                  className="button button-section-specific-sizing button-gradient-effect gradient-shine-enabled"
                >
                  LÄS MER HÄR
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageWithTextSmile;
