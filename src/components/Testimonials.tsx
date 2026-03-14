import React, { useState, useEffect } from "react";
import "./Testimonials.css";
import stockImage from "../assets/stock.svg";
const avatar1 = stockImage;
const avatar2 = stockImage;
const avatar3 = stockImage;
const avatar4 = stockImage;

interface Testimonial {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    title: "Sjukt bra täckning!",
    content:
      "Jag var skeptisk först men wow vilken skillnad. Det ser helt naturligt ut och ingen kan se att jag använder något. Mitt självförtroende har verkligen höjts!",
    author: {
      name: "Erik S.",
      avatar: avatar1,
    },
    rating: 5,
  },
  {
    id: 2,
    title: "Smidigt och snabbt",
    content:
      "Tar bara några sekunder på morgonen. Det sitter hela dagen trots att jag jobbar utomhus i vind och regn. Bästa investeringen jag gjort för mitt hår.",
    author: {
      name: "Marcus B.",
      avatar: avatar2,
    },
    rating: 5,
  },
  {
    id: 3,
    title: "Ser helt naturligt ut",
    content:
      "Har provat andra märken men Mello är överlägset. Fiberna klumpar sig inte och färgen matchar mitt hår perfekt. Mycket nöjd kund!",
    author: {
      name: "Johan L.",
      avatar: avatar3,
    },
    rating: 5,
  },
  {
    id: 4,
    title: "Äntligen något som funkar",
    content:
      "Har tunt hår på hjässan och detta trollar bort det på nolltid. Det känns tryggt att veta att det sitter där det ska hela kvällen när man är ute.",
    author: {
      name: "Anders P.",
      avatar: avatar4,
    },
    rating: 5,
  },
];

const StarIcon: React.FC<{ filled?: boolean }> = ({ filled = true }) => (
  <svg
    className="testimonials-star testimonials-card-star"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5245 3.46353C11.6741 3.00287 12.3259 3.00287 12.4755 3.46353L14.1329 8.56434C14.1998 8.77035 14.3918 8.90983 14.6084 8.90983H19.9717C20.4561 8.90983 20.6575 9.52964 20.2656 9.81434L15.9266 12.9668C15.7514 13.0941 15.678 13.3198 15.745 13.5258L17.4023 18.6266C17.552 19.0873 17.0248 19.4704 16.6329 19.1857L12.2939 16.0332C12.1186 15.9059 11.8814 15.9059 11.7061 16.0332L7.3671 19.1857C6.97524 19.4704 6.448 19.0873 6.59768 18.6266L8.25503 13.5258C8.32197 13.3198 8.24864 13.0941 8.07339 12.9668L3.73438 9.81434C3.34253 9.52964 3.54392 8.90983 4.02828 8.90983H9.39159C9.6082 8.90983 9.80018 8.77035 9.86712 8.56434L11.5245 3.46353Z"
      fill={filled ? "#ffbf00" : "transparent"}
    ></path>
  </svg>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div
      className="testimonial-card"
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e5e5e5",
      }}
    >
      {/* Stars at the top */}
      <div className="testimonials-card-rating">
        <div className="testimonials-card-stars">
          <div className="testimonials-stars">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} filled={i < testimonial.rating} />
            ))}
          </div>
        </div>
      </div>

      {/* Title below stars */}
      <h3
        className="testimonial-title"
        style={{
          color: "#000000",
          fontWeight: "var(--font-weight-bold)",
          letterSpacing: "var(--letter-spacing-heading)",
        }}
      >
        {testimonial.title}
      </h3>

      {/* Content below title */}
      <div
        className="testimonial-content"
        style={{
          color: "#000000",
          fontWeight: "var(--font-weight-regular)",
          letterSpacing: "var(--letter-spacing-body)",
        }}
      >
        <p>{testimonial.content}</p>
      </div>

      {/* Author section */}
      <div className="testimonial-author-container">
        <div className="testimonial-author">
          <div
            className="author-avatar"
            style={{
              backgroundColor: "#9acd32",
              color: "#000000",
              fontWeight: "var(--font-weight-bold)",
            }}
          >
            {testimonial.author.avatar ? (
              <img
                src={testimonial.author.avatar}
                alt={testimonial.author.name}
                loading="lazy"
                width=""
                height=""
              />
            ) : (
              testimonial.author.name.charAt(0)
            )}
          </div>
          <div className="author-info">
            <div className="author-info-container">
              <div className="author-info-details">
                <span className="author-name" style={{ color: "#000000" }}>
                  {testimonial.author.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(320);
  const [gap, setGap] = useState(20);

  // Calculate card width and gap based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth >= 750) {
        setCardWidth(320);
        setGap(20);
      } else {
        // Mobile: 85% of container width
        const containerWidth = Math.min(1200, window.innerWidth - 40);
        setCardWidth(containerWidth * 0.85);
        setGap(20);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate transform offset
  const offset = currentIndex * (cardWidth + gap);

  return (
    <section
      id="shopify-section-template--26436321640792__testimonials_bNpnt8"
      className="shopify-section section"
    >
      <div
        className="testimonials-section section-template--26436321640792__testimonials_bNpnt8 page-fade-in"
        data-use-theme-colors="false"
        style={{
          paddingTop: "0px",
          paddingBottom: "0px",
          background: "transparent",
        }}
      >
        <div className="testimonials-container">
          <div className="testimonials-carousel">
            <div
              className="testimonials-track"
              style={{
                transform: `translateX(-${offset}px)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              {testimonialsData.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
