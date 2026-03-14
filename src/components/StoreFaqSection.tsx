import { useState } from "react";
import "./StoreFaqSection.css";

const faqData = [
  {
    question: "Hur fungerar Mello Hair Filler?",
    answer: "Mello Hair Filler består av naturliga mikrofibrer som fäster vid dina befintliga hårstrån med hjälp av statisk elektricitet. Detta skapar en omedelbar effekt av fylligare och tätare hår."
  },
  {
    question: "Sitter det kvar i vind och regn?",
    answer: "Ja, fibrerna är designade för att sitta säkert på plats. För extra hållbarhet rekommenderar vi att du fixerar med en lätt hårspray efter applicering, vilket gör resultatet vind-, regn- och svettsäkert."
  },
  {
    question: "Hur väljer jag rätt färg?",
    answer: "Välj den färg som bäst matchar din nuvarande hårfärg vid rötterna. Om du är osäker, välj en nyans mörkare för en mer naturlig täckning."
  },
  {
    question: "Hur länge räcker en flaska?",
    answer: "Beroende på hur stort område du täcker och hur ofta du använder produkten, räcker en flaska normalt i 30-60 dagar vid daglig användning."
  },
  {
    question: "Kan jag använda stylingprodukter?",
    answer: "Ja, men vi rekommenderar att du applicerar Hair Filler i torrt hår efter att du har använt eventuell gel eller vax. Avsluta sedan med hårspray för att fixera."
  },
  {
    question: "Vad är er frakt och returpolicy?",
    answer: "Skickas ut inom 1-3 arbetsdagar. Retur upp till 30 dagar från leveransdatum. 100% pengarna-tillbaka-garanti."
  }
];

const StoreFaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="shopify-section section">
      <div className="store-faq-section">
        <div className="store-faq-container">
          <div className="faq-flex-container center-no-image">
            <div className="faq-header-column">
              <h2 className="store-faq-heading">
                Vanliga frågor
              </h2>
            </div>
            
            <div className="faq-content-column">
              <div className="store-faq">
                <div className="faq-container">
                  {faqData.map((item, index) => (
                    <div 
                      key={index} 
                      className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                    >
                      <div 
                        className="faq-question" 
                        onClick={() => toggleAccordion(index)}
                      >
                        <span>{item.question}</span>
                        <span className="faq-toggle">{activeIndex === index ? '−' : '+'}</span>
                      </div>
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreFaqSection;
