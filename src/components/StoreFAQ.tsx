import React, { useState } from 'react';
import './StoreFAQ.css';

const FAQS = [
  {
    q: 'Behöver jag göra något speciellt innan jag applicerar?',
    a: 'Håret bör vara torrt och stilat som vanligt innan du applicerar Mello Hair Filler. Skaka flaskan ordentligt för att aktivera fibrerna.',
  },
  {
    q: 'Hur länge håller resultatet?',
    a: 'Resultatet håller hela dagen tills du tvättar håret med schampo. Produkten är vind- och vattentålig under normala förhållanden.',
  },
  {
    q: 'Fungerar det på alla hårfärger?',
    a: 'Ja, Mello finns i 8 nyanser för att matcha alla naturliga hårfärger – från ljusblont till kolsvart.',
  },
  {
    q: 'Är produkten testad och säker?',
    a: 'Mello Hair Filler är dermatologiskt testad och godkänd av hudläkare. Fri från skadliga kemikalier och säker för dagligt bruk.',
  },
  {
    q: 'Vad händer om jag inte är nöjd?',
    a: '30 dagars pengarna-tillbaka-garanti – inga frågor ställs. Kontakta oss så löser vi det direkt.',
  },
];

const StoreFAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="sfaq-section">
      <div className="sfaq-wrap">
        <div className="sfaq-layout">
          <div className="sfaq-left">
            <h2 className="sfaq-heading">Vanliga frågor</h2>
          </div>
          <div className="sfaq-right">
            <div className="sfaq-list">
              {FAQS.map((item, i) => (
                <div
                  key={i}
                  className={`sfaq-item ${open === i ? 'open' : ''}`}
                >
                  <button
                    className="sfaq-q"
                    onClick={() => setOpen(open === i ? null : i)}
                    type="button"
                  >
                    <span>{item.q}</span>
                    <span className="sfaq-toggle">{open === i ? '−' : '+'}</span>
                  </button>
                  <div className="sfaq-a">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreFAQ;
