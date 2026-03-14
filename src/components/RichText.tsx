import React, { useEffect } from 'react';
import './RichText.css';

interface RichTextProps {
  onAddToCart: () => void;
}

const RichText: React.FC<RichTextProps> = ({ onAddToCart }) => {
  useEffect(() => {
    // Handle CTA button clicks - add to cart and scroll
    const initScrollToProduct = () => {
      const scrollButtons = document.querySelectorAll('.rich-text-button');
      
      scrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          // Add to cart first
          onAddToCart();
          
          // Then scroll to product section
          const targetId = button.getAttribute('href');
          if (!targetId) return;
          
          let targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            const productSelectors = [
              '#MainProduct', '#shopify-section-product-template', '#shopify-section-product',
              '#product-section', '.product-section', '.product-template', '.product-container',
              '.product-main', '.product', '[data-section-type="product"]', '[data-section-id*="product"]'
            ];
            
            for (const selector of productSelectors) {
              const el = document.querySelector(selector);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
              }
            }
            
            const main = document.querySelector('main') || document.querySelector('#MainContent');
            if (main) {
              main.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });
    };

    initScrollToProduct();
  }, [onAddToCart]);

  return (
    <section 
      id="shopify-section-template--26436321640792__rich_text_twy79R" 
      className="shopify-section section"
    >
      <div className="rich-text-section-template--26436321640792__rich_text_twy79R page-fade-in">
        <div className="page-width">
          <div className="rich-text-button-wrapper" data-block-id="button_rwzCWH">
            <a 
              href="#shopify-section-template--25997913817432__main" 
              className="rich-text-button"
            >
              Få fylligare hår NU
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RichText;
