import React, { useId, useState } from "react";
import { useCart } from "../context/CartContext";
import stockImage from "../assets/stock.svg";
import "./QuantityBreak.css";

type PackOption = "1" | "2" | "3";

interface QuantityBreakProps {
  selectedPackage: PackOption;
  onPackageChange: (value: PackOption) => void;
}

const PACKS = [
  {
    id: "1" as PackOption,
    label: "1 Pack",
    sub: "Perfekt för att testa",
    price: 349,
    originalPrice: null,
    badge: null,
    savePct: null,
    perUnit: "349 kr / st",
  },
  {
    id: "2" as PackOption,
    label: "2 Pack",
    sub: "Populärast — för synliga resultat",
    price: 599,
    originalPrice: 698,
    badge: "MEST POPULÄR",
    savePct: 14,
    perUnit: "300 kr / st",
  },
  {
    id: "3" as PackOption,
    label: "3 Pack + 1 GRATIS",
    sub: "Bästa värdet — räcker hela året",
    price: 849,
    originalPrice: 1396,
    badge: "SPARA 39%",
    savePct: 39,
    perUnit: "212 kr / st",
  },
] as const;

const TRUST = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    text: "30 dagars garanti",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    text: "Klinisk beprövat",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    text: "Snabb leverans",
  },
];

const FAQ_ITEMS = [
  { q: "Ingredienser", a: "Naturliga keratinfiber, ammoniumklorid, kisel, färgämnen (beroende på vald färg)." },
  { q: "Hur länge håller det?", a: "Håller hela dagen. Tvättas bort enkelt med shampoo." },
  { q: "Fungerar det på alla hårfärger?", a: "Ja, vi har shades som matchar alla naturliga hårfärger." },
];

const PAYMENT_ICONS = [
  { id: "mastercard", label: "Mastercard", svg: <svg className="pi-svg" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-mc"><title id="pi-mc">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><circle fill="#EB001B" cx="15" cy="12" r="7"/><circle fill="#F79E1B" cx="23" cy="12" r="7"/><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.2-3 3.3-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"/></svg> },
  { id: "visa", label: "Visa", svg: <svg className="pi-svg" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"/></svg> },
  { id: "klarna", label: "Klarna", svg: <svg className="pi-svg" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-klarna" fill="none"><title id="pi-klarna">Klarna</title><rect width="38" height="24" rx="2" fill="#FFA8CD"/><rect x=".5" y=".5" width="37" height="23" rx="1.5" stroke="#000" strokeOpacity=".07"/><path d="M30.62 14.755c-.662 0-1.179-.554-1.179-1.226 0-.673.517-1.226 1.18-1.226.663 0 1.18.553 1.18 1.226 0 .672-.517 1.226-1.18 1.226zm-.33 1.295c.565 0 1.286-.217 1.686-1.068l.04.02c-.176.465-.176.742-.176.81v.11h1.423v-4.786H31.84v.109c0 .069 0 .346.175.81l-.039.02c-.4-.85-1.121-1.068-1.687-1.068-1.355 0-2.31 1.088-2.31 2.522 0 1.433.955 2.521 2.31 2.521zm-4.788-5.043c-.643 0-1.15.228-1.56 1.068l-.039-.02c.175-.464.175-.741.175-.81v-.11h-1.423v4.787h1.462V13.4c0-.662.38-1.078.995-1.078.614 0 .917.356.917 1.068v2.532h1.462v-3.046c0-1.088-.838-1.869-1.989-1.869zm-4.963 1.068l-.039-.02c.176-.464.176-.741.176-.81v-.11h-1.424v4.787h1.463l.01-2.304c0-.673.35-1.078.926-1.078.156 0 .282.02.429.06v-1.464c-.644-.139-1.22.109-1.54.94zm-4.65 2.68c-.664 0-1.18-.554-1.18-1.226 0-.673.516-1.226 1.18-1.226.662 0 1.179.553 1.179 1.226 0 .672-.517 1.226-1.18 1.226zm-.332 1.295c.565 0 1.287-.217 1.687-1.068l.038.02c-.175.465-.175.742-.175.81v.11h1.424v-4.786h-1.424v.109c0 .069 0 .346.175.81l-.038.02c-.4-.85-1.122-1.068-1.687-1.068-1.356 0-2.311 1.088-2.311 2.522 0 1.433.955 2.521 2.31 2.521zm-4.349-.128h1.463V9h-1.463v6.922zM10.136 9H8.644c0 1.236-.751 2.343-1.892 3.134l-.448.317V9h-1.55v6.922h1.55V12.49l2.564 3.43h1.892L8.293 12.64c1.121-.82 1.852-2.096 1.843-3.639z" fill="#0B051D"/></svg> },
  { id: "applepay", label: "Apple Pay", svg: <svg className="pi-svg" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-apple"><title id="pi-apple">Apple Pay</title><rect width="38" height="24" rx="3" fill="#000"/><path d="M10.5 8.5c.5-.6.8-1.4.7-2.2-.7 0-1.5.5-2 1.1-.4.5-.8 1.3-.7 2.1.7.1 1.5-.4 2-1zm.7 1.1c-1.1-.1-2 .6-2.6.6-.5 0-1.3-.6-2.2-.6-1.1 0-2.2.7-2.8 1.7-1.2 2.1-.3 5.1.8 6.8.6.8 1.2 1.7 2.1 1.7.8 0 1.2-.6 2.2-.6 1 0 1.3.6 2.2.6.9 0 1.5-.8 2.1-1.7.6-1 .9-1.9.9-1.9s-1.8-.7-1.8-2.7c0-1.7 1.4-2.5 1.5-2.6-.8-1.2-2-1.3-2.4-1.3z" fill="#fff"/><path d="M21.5 7.3h2.8c2.4 0 4.1 1.7 4.1 4.1 0 2.4-1.7 4.1-4.2 4.1h-2.7V7.3zm1.9 6.8h1.4c1.7 0 2.7-.9 2.7-2.7 0-1.8-1-2.7-2.7-2.7h-1.4V14.1zm9-1.6c0-1.6 1.2-2.6 3.5-2.7l2.4-.1V9c0-1-.7-1.6-1.9-1.6-1 0-1.7.5-1.8 1.3h-1.7c.1-1.6 1.6-2.8 3.6-2.8 2.2 0 3.7 1.2 3.7 3v6.2h-1.8v-1.5h-.1c-.5 1-1.6 1.6-2.9 1.6-1.8 0-3-.9-3-2.7zm5.9-.8v-.7l-2.2.1c-1.2.1-1.8.5-1.8 1.3 0 .8.7 1.3 1.7 1.3 1.3 0 2.3-.9 2.3-2z" fill="#fff"/></svg> },
];

const QuantityBreak: React.FC<QuantityBreakProps> = ({ selectedPackage, onPackageChange }) => {
  const { addItem } = useCart();
  const groupId = useId();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectedPack = PACKS.find((p) => p.id === selectedPackage)!;

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({
      id: `pack-${selectedPackage}`,
      name: `Mello Hair Filler – ${selectedPack.label}`,
      price: selectedPack.price,
      quantity: 1,
      image: stockImage,
      ...(selectedPack.originalPrice ? { originalPrice: selectedPack.originalPrice } : {}),
    });
  };

  return (
    <div className="qb-root">
      {/* Bundle cards */}
      <div className="qb-section-label">Välj ditt paket</div>

      <div className="qb-options">
        {PACKS.map((pack) => {
          const isSelected = selectedPackage === pack.id;
          return (
            <label
              key={pack.id}
              className={`qb-option ${isSelected ? "selected" : ""}`}
              htmlFor={`${groupId}-${pack.id}`}
            >
              {pack.badge && (
                <span className={`qb-badge ${pack.id === "2" ? "popular" : "value"}`}>
                  {pack.badge}
                </span>
              )}

              <input
                type="radio"
                id={`${groupId}-${pack.id}`}
                name={groupId}
                value={pack.id}
                checked={isSelected}
                onChange={() => onPackageChange(pack.id)}
                className="qb-radio-input"
              />

              <div className="qb-radio">
                <div className="qb-radio-dot" />
              </div>

              <div className="qb-option-body">
                <div className="qb-option-left">
                  <div className="qb-option-title">{pack.label}</div>
                  <div className="qb-option-sub">{pack.sub}</div>
                  {pack.savePct && (
                    <div className="qb-per-unit">{pack.perUnit}</div>
                  )}
                </div>

                <div className="qb-option-right">
                  <div className="qb-price">{pack.price} kr</div>
                  {pack.originalPrice && (
                    <div className="qb-original-price">{pack.originalPrice} kr</div>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Add to cart */}
      <form onSubmit={handleAddToCart} className="qb-form">
        <button type="submit" className="qb-atc-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="qb-cart-icon">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Lägg i varukorgen
        </button>
      </form>

      {/* Payment icons */}
      <div className="qb-payment">
        {PAYMENT_ICONS.map((pi) => (
          <div key={pi.id} className="qb-payment-icon">{pi.svg}</div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="qb-trust">
        {TRUST.map((t, i) => (
          <div key={i} className="qb-trust-item">
            <div className="qb-trust-icon">{t.icon}</div>
            <span className="qb-trust-text">{t.text}</span>
          </div>
        ))}
      </div>
    {/* Customer review card */}
      <div className="qb-review-card">
        <div className="qb-review-avatar">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=MalinJ"
            alt="Malin J."
            loading="lazy"
          />
        </div>
        <div className="qb-review-body">
          <div className="qb-review-header">
            <span className="qb-review-name">
              Malin J.
              <svg className="qb-review-verified" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.5924 3.20027C9.34888 3.4078 9.22711 3.51158 9.09706 3.59874C8.79896 3.79854 8.46417 3.93721 8.1121 4.00672C7.95851 4.03705 7.79903 4.04977 7.48008 4.07522C6.6787 4.13918 6.278 4.17115 5.94371 4.28923C5.17051 4.56233 4.56233 5.17051 4.28923 5.94371C4.17115 6.278 4.13918 6.6787 4.07522 7.48008C4.04977 7.79903 4.03705 7.95851 4.00672 8.1121C3.93721 8.46417 3.79854 8.79896 3.59874 9.09706C3.51158 9.22711 3.40781 9.34887 3.20027 9.5924C2.67883 10.2043 2.4181 10.5102 2.26522 10.8301C1.91159 11.57 1.91159 12.43 2.26522 13.1699C2.41811 13.4898 2.67883 13.7957 3.20027 14.4076C3.40778 14.6511 3.51158 14.7729 3.59874 14.9029C3.79854 15.201 3.93721 15.5358 4.00672 15.8879C4.03705 16.0415 4.04977 16.201 4.07522 16.5199C4.13918 17.3213 4.17115 17.722 4.28923 18.0563C4.56233 18.8295 5.17051 19.4377 5.94371 19.7108C6.278 19.8288 6.6787 19.8608 7.48008 19.9248C7.79903 19.9502 7.95851 19.963 8.1121 19.9933C8.46417 20.0628 8.79896 20.2015 9.09706 20.4013C9.22711 20.4884 9.34887 20.5922 9.5924 20.7997C10.2043 21.3212 10.5102 21.5819 10.8301 21.7348C11.57 22.0884 12.43 22.0884 13.1699 21.7348C13.4898 21.5819 13.7957 21.3212 14.4076 20.7997C14.6511 20.5922 14.7729 20.4884 14.9029 20.4013C15.201 20.2015 15.5358 20.0628 15.8879 19.9933C16.0415 19.963 16.201 19.9502 16.5199 19.9248C17.3213 19.8608 17.722 19.8288 18.0563 19.7108C18.8295 19.4377 19.4377 18.8295 19.7108 18.0563C19.8288 17.722 19.8608 17.3213 19.9248 16.5199C19.9502 16.201 19.963 16.0415 19.9933 15.8879C20.0628 15.5358 20.2015 15.201 20.4013 14.9029C20.4884 14.7729 20.5922 14.6511 20.7997 14.4076C21.3212 13.7957 21.5819 13.4898 21.7348 13.1699C22.0884 12.43 22.0884 11.57 21.7348 10.8301C21.5819 10.5102 21.3212 10.2043 20.7997 9.5924C20.5922 9.34887 20.4884 9.22711 20.4013 9.09706C20.2015 8.79896 20.0628 8.46417 19.9933 8.1121C19.963 7.95851 19.9502 7.79903 19.9248 7.48008C19.8608 6.6787 19.8288 6.278 19.7108 5.94371C19.4377 5.17051 18.8295 4.56233 18.0563 4.28923C17.722 4.17115 17.3213 4.13918 16.5199 4.07522C16.201 4.04977 16.0415 4.03705 15.8879 4.00672C15.5358 3.93721 15.201 3.79854 14.9029 3.59874C14.7729 3.51158 14.6511 3.40781 14.4076 3.20027C13.7957 2.67883 13.4898 2.41811 13.1699 2.26522C12.43 1.91159 11.57 1.91159 10.8301 2.26522C10.5102 2.4181 10.2043 2.67883 9.5924 3.20027ZM16.3735 9.86314C16.6913 9.5453 16.6913 9.03 16.3735 8.71216C16.0557 8.39433 15.5403 8.39433 15.2225 8.71216L10.3723 13.5624L8.77746 11.9676C8.45963 11.6498 7.94432 11.6498 7.62649 11.9676C7.30866 12.2854 7.30866 12.8007 7.62649 13.1186L9.79678 15.2889C10.1146 15.6067 10.6299 15.6067 10.9478 15.2889L16.3735 9.86314Z" fill="#4caf50" />
              </svg>
            </span>
            <div className="qb-review-stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 32 32" width="14" height="14">
                  <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" fill="#ef4a65" />
                </svg>
              ))}
            </div>
          </div>
          <p className="qb-review-text">Köpte 2-packet och ångrar ingenting. Fibrerna håller hela dagen och resultatet är otroligt naturligt. Har äntligen fått tillbaka förtroendet!</p>
        </div>
      </div>
      <br/>
      {/* FAQ */}
      <div className="qb-faq">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className={`qb-faq-item ${openFaq === i ? "open" : ""}`}>
            <button
              className="qb-faq-q"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              type="button"
            >
              <span>{item.q}</span>
              <span className="qb-faq-toggle">{openFaq === i ? "−" : "+"}</span>
            </button>
            <div className="qb-faq-a">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default QuantityBreak;
