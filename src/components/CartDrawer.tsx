import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';
import PaymentIcons from './PaymentIcons';

const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    updateQuantity, 
    removeItem, 
    subtotal, 
    totalSavings, 
    totalItems,
    shippingProtection,
    setShippingProtection,
    shippingProtectionCost
  } = useCart();
  
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isCartOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckout = async () => {
    // Find the primary bundle item in the cart to determine variantId
    const bundleMap: Record<string, string> = {
      'pack-1': 'single',
      'pack-2': 'duo',
      'pack-3': 'squad'
    };

    const mainItem = cartItems.find(item => bundleMap[item.id]);
    const variantId = mainItem ? bundleMap[mainItem.id] : 'duo'; // Default to duo if no bundle found

    try {
      const searchParams = new URLSearchParams(window.location.search);
      
      const payload = {
        variantId,
        quantity: mainItem ? mainItem.quantity : 1,
        path: window.location.pathname,
        sid: searchParams.get('sid') || undefined,
        uid: searchParams.get('uid') || undefined,
        ttclid: searchParams.get('ttclid') || undefined,
        utm_source: searchParams.get('utm_source') || undefined,
        utm_medium: searchParams.get('utm_medium') || undefined,
        utm_campaign: searchParams.get('utm_campaign') || undefined,
        utm_term: searchParams.get('utm_term') || undefined,
        utm_content: searchParams.get('utm_content') || undefined,
        ref_slug: searchParams.get('ref_slug') || undefined,
      };

      const response = await fetch('https://www.mellosanta.se/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Checkout request failed');
      }

      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Något gick fel vid utcheckningen. Försök igen.');
    }
  };

  return (
    <div className={`cart-drawer-overlay ${isCartOpen ? 'active' : ''}`}>
      <div 
        ref={drawerRef}
        className={`cart-drawer ${isCartOpen ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Din varukorg"
      >
        <div className="drawer__header">
          <h2 className="drawer__heading">
            Din varukorg
            {cartItems.length > 0 && (
              <span className="gb-cart-total-item">{cartItems.length}</span>
            )}
          </h2>
          <button 
            className="drawer__close" 
            type="button" 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close"
          >
            <span className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon icon-close" viewBox="0 0 18 17">
                <path fill="currentColor" d="M.865 15.978a.5.5 0 0 0 .707.707l7.433-7.431 7.579 7.282a.501.501 0 0 0 .846-.37.5.5 0 0 0-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 1 0-.707-.708L8.991 7.853 1.413.573a.5.5 0 1 0-.693.72l7.563 7.268z"></path>
              </svg>
            </span>
          </button>
        </div>

        <div className="social-proof-bar">
          <div className="social-proof-bar__content">
            <div className="social-proof-bar__icon social-proof-bar__icon--users">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6875 9.0625C15.75 9.0625 16.625 8.1875 16.625 7.125C16.625 6.0625 15.75 5.1875 14.6875 5.1875C13.625 5.1875 12.75 6.0625 12.75 7.125C12.75 8.1875 13.625 9.0625 14.6875 9.0625ZM7 8.5C8.375 8.5 9.4375 7.4375 9.4375 6.0625C9.4375 4.6875 8.375 3.625 7 3.625C5.625 3.625 4.5625 4.6875 4.5625 6.0625C4.5625 7.4375 5.625 8.5 7 8.5ZM14.6875 10.625C13.3125 10.625 10.5625 11.3125 10.5625 12.6875V14.25H18.8125V12.6875C18.8125 11.3125 16.0625 10.625 14.6875 10.625ZM7 10.0625C5.25 10.0625 1.75 10.9375 1.75 12.6875V14.25H7V12.6875C7 12.125 7.1875 10.875 8.8125 9.9375C8.1875 9.375 7.4375 9.0625 7 9.0625V10.0625Z" fill="currentColor"></path>
              </svg>
            </div>
            <div className="social-proof-bar__text">
              Bli en del av 11.740 glada kunder
            </div>
          </div>
        </div>


        <div className="drawer__items-wrapper scrollable-contents">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty-content">
              <p>Din varukorg är tom</p>
            </div>
          ) : (
            <form action="/cart" id="CartDrawer-Form" className="cart__contents cart-drawer__form" method="post" onSubmit={(e) => e.preventDefault()}>
              <div id="CartDrawer-CartItems" className="drawer__contents js-contents">
                <div className="drawer__cart-items-wrapper">
                  <table className="cart-items" role="table">
                    <tbody role="rowgroup">
                      {cartItems.map((item) => (
                        <tr key={item.id} id={`CartDrawer-Item-${item.id}`} className="cart-item" role="row">
                          <td className="cart-item__media" role="cell" headers="CartDrawer-ColumnProductImage">
                            <a href="#" className="cart-item__link" tabIndex={-1} aria-hidden="true"> </a>
                            <img className="cart-item__image" src={item.image} alt={item.name} loading="lazy" width="150" height="150" />
                          </td>

                          <td className="cart-item__details" role="cell" headers="CartDrawer-ColumnProduct">
                            <div className="cart-item__top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                              <a href="#" className="cart-item__name h4 break">{item.name}</a>
                              <div className="cart-item__price-stack" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <div className="gb-price-drawer" style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
                                  <strong className="cart-item__final-price product-option">
                                    <span className="money">kr {item.price}.00</span>
                                  </strong>
                                  {item.originalPrice && item.originalPrice > item.price && (
                                    <s className="cart-item__old-price product-option">
                                      <span className="money">kr {item.originalPrice}.00</span>
                                    </s>
                                  )}
                                </div>
                                {item.originalPrice && item.originalPrice > item.price && (
                                  <div className="gb-price-drawer-saving">
                                    SAVE
                                    <span className="money"> {(item.originalPrice - item.price).toFixed(2)} kr</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="cart-item__bottom-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div className="cart-item__quantity-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div className="quantity cart-quantity">
                                  <button className="quantity__button" name="minus" type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon icon-minus" viewBox="0 0 10 2"><path fill="currentColor" fillRule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 1 1 0 1H1A.5.5 0 0 1 .5 1" clipRule="evenodd"></path></svg>
                                  </button>
                                  <input 
                                    className="quantity__input" 
                                    type="number" 
                                    value={item.quantity} 
                                    min="1"
                                    aria-label={`Quantity for ${item.name}`}
                                    readOnly
                                  />
                                  <button className="quantity__button" name="plus" type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon icon-plus" viewBox="0 0 10 10"><path fill="currentColor" fillRule="evenodd" d="M1 4.51a.5.5 0 0 0 0 1h3.5l.01 3.5a.5.5 0 0 0 1-.01V5.5l3.5-.01a.5.5 0 0 0-.01-1H5.5L5.49.99a.5.5 0 0 0-1 .01v3.5l-3.5.01z" clipRule="evenodd"></path></svg>
                                  </button>
                                </div>
                                <button type="button" className="cart-remove-button" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)}>
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 1.5V2.5H3C2.44772 2.5 2 2.94772 2 3.5V4.5C2 5.05228 2.44772 5.5 3 5.5H21C21.5523 5.5 22 5.05228 22 4.5V3.5C22 2.94772 21.5523 2.5 21 2.5H16V1.5C16 0.947715 15.5523 0.5 15 0.5H9C8.44772 0.5 8 0.947715 8 1.5Z" fill="currentColor"></path>
                                    <path d="M3.9231 7.5H20.0767L19.1344 20.2216C19.0183 21.7882 17.7135 23 16.1426 23H7.85724C6.28636 23 4.98148 21.7882 4.86544 20.2216L3.9231 7.5Z" fill="currentColor"></path>
                                  </svg>
                                </button>
                              </div>
                              
                             
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          )}
        </div>


        <div className="drawer__footer">
          <div className="gb-shipping-protection">
            <div className="gb-shipping-protection-icon">
              <img src="https://glacr.se/cdn/shop/files/shipping-protection-v2_fa80a61d-dd1e-4e0b-a216-fe778a82d5f5.png?v=1759258254&width=46" alt="Leveransskydd" width="46" height="46" />
            </div>
            <div className="gb-shipping-protection-icontext">
              <h2>
                Leveransskydd {' '}
                <div className="shipping-protection-price-wrapper">
                  <s style={{ color: 'rgba(18, 18, 18, 0.6)', marginRight: '6px' }}><span className="money">{shippingProtectionCost}.00 kr</span></s>
                  <span className="gb-price-drawer-saving" style={{ fontSize: '10px', padding: '2px 6px' }}>GRATIS</span>
                </div>
              </h2>
              <p>
                Skydda din beställning från skador, förlust eller stöld under transporten
              </p>
            </div>
            <div className="gb-shipping-protection-button">
              <label className={`switch ${!shippingProtection ? 'unchecked' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={shippingProtection} 
                  onChange={(e) => setShippingProtection(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div className="totals gb-discounts-cart-values" role="status" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5px' }}>
            <div className="totals__total">
              <span className="total_count">
                Total: {totalItems} Items
              </span>
            </div>
            <div className="discount_price-container">
              {totalSavings > 0 && totalItems > 1 && (
                <div className="discount_discount-value" style={{ marginLeft: '8px' }}>
                  <span className="discount_discount-label"></span>
                  <span style={{ fontWeight: 400 }}>-<span className="money">{subtotal + totalSavings - subtotal}.00 kr</span></span>
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                {totalSavings > 0 && totalItems > 1 && (
                  <s className="cart-item__old-price product-option" style={{ marginRight: '3px', fontSize: '14px', color: 'currentColor', opacity: 0.7 }}>
                    <span className="money">{subtotal + totalSavings}.00 kr</span>
                  </s>
                )}
                <div className="totals__total-value">
                  <span className="money">{subtotal}.00 kr</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cart__ctas">
            <button type="button" className="cart__checkout-button button button-gradient-effect gradient-shine-enabled" onClick={handleCheckout}>
              <svg className="icon icon-lock" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span className="button-text">Gå till kassan</span>
            </button>
          </div>

          <div className="cart-drawer-payment-icons">
            <PaymentIcons />
          </div>

          <h2 className="gb-30day-back" style={{ color: '#000000', fontSize: '12px', opacity: 1 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="18" height="18">
              <rect width="256" height="256" fill="none"></rect>
              <path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" opacity="0.2" fill="#000000"></path>
              <path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><polyline points="88 136 112 160 168 104" fill="#000000" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline>
            </svg>
            100% pengar tillbaka-garanti
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
