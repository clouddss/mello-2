import React from "react";
import "./Testimonials.css";
import stockImage from "../assets/stock.svg";

const REVIEWS = [
  {
    id: 1,
    title: "Sjukt bra täckning!",
    body: "Jag var skeptisk först men wow vilken skillnad. Det ser helt naturligt ut och ingen kan se att jag använder något. Mitt självförtroende har verkligen höjts!",
    name: "Erik S.",
    avatar: stockImage,
  },
  {
    id: 2,
    title: "Smidigt och snabbt",
    body: "Tar bara några sekunder på morgonen. Det sitter hela dagen trots att jag jobbar utomhus i vind och regn. Bästa investeringen jag gjort för mitt hår.",
    name: "Marcus B.",
    avatar: stockImage,
  },
  {
    id: 3,
    title: "Ser helt naturligt ut",
    body: "Har provat andra märken men Mello är överlägset. Fiberna klumpar sig inte och färgen matchar mitt hår perfekt. Mycket nöjd kund!",
    name: "Johan L.",
    avatar: stockImage,
  },
  {
    id: 4,
    title: "Äntligen något som funkar",
    body: "Har tunt hår på hjässan och detta trollar bort det på nolltid. Det känns tryggt att veta att det sitter där det ska hela kvällen.",
    name: "Anders P.",
    avatar: stockImage,
  },
];

const Stars: React.FC = () => (
  <div className="tm-stars">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="tm-star" viewBox="0 0 24 24">
        <path
          d="M11.5245 3.46353C11.6741 3.00287 12.3259 3.00287 12.4755 3.46353L14.1329 8.56434C14.1998 8.77035 14.3918 8.90983 14.6084 8.90983H19.9717C20.4561 8.90983 20.6575 9.52964 20.2656 9.81434L15.9266 12.9668C15.7514 13.0941 15.678 13.3198 15.745 13.5258L17.4023 18.6266C17.552 19.0873 17.0248 19.4704 16.6329 19.1857L12.2939 16.0332C12.1186 15.9059 11.8814 15.9059 11.7061 16.0332L7.3671 19.1857C6.97524 19.4704 6.448 19.0873 6.59768 18.6266L8.25503 13.5258C8.32197 13.3198 8.24864 13.0941 8.07339 12.9668L3.73438 9.81434C3.34253 9.52964 3.54392 8.90983 4.02828 8.90983H9.39159C9.6082 8.90983 9.80018 8.77035 9.86712 8.56434L11.5245 3.46353Z"
          fill="#ef4a65"
        />
      </svg>
    ))}
  </div>
);

const Testimonials: React.FC = () => (
  <section className="tm-section">
    <div className="tm-wrap">
      <div className="tm-header">
        <p className="tm-eyebrow">Vad våra kunder säger</p>
        <h2 className="tm-heading">
          Älskad av <em>tusentals</em> svenska män
        </h2>
        <div className="tm-summary">
          <Stars />
          <span className="tm-summary-text">4,7/5 baserat på +3 475 recensioner</span>
        </div>
      </div>

      <div className="tm-grid">
        {REVIEWS.map((r) => (
          <div key={r.id} className="tm-card">
            <Stars />
            <h3 className="tm-card-title">{r.title}</h3>
            <p className="tm-card-body">{r.body}</p>
            <div className="tm-card-author">
              <img src={r.avatar} alt={r.name} className="tm-avatar" />
              <div>
                <div className="tm-author-name">{r.name}</div>
                <div className="tm-verified">Verifierat köp</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
