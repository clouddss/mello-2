import React from "react";
import "./HowToSteps.css";

const STEPS = [
  {
    num: "01",
    title: "Skaka flaskan",
    desc: "Skaka flaskan ordentligt före användning för att aktivera fibrerna och säkerställa jämn applicering.",
  },
  {
    num: "02",
    title: "Applicera",
    desc: "Strö fibrerna över de områden du vill täcka. Klappa försiktigt med fingertopparna för att fixera dem.",
  },
  {
    num: "03",
    title: "Fixera",
    desc: "Spraya lätt med hårspray för att låsa fast fibrerna hela dagen. Resultatet sitter tills du tvättar håret.",
  },
];

const HowToSteps: React.FC = () => (
  <section className="hts-section">
    <div className="hts-wrap">
      <div className="hts-header">
        <p className="hts-eyebrow">Så enkelt är det</p>
        <h2 className="hts-heading">
          Tre steg till <em>fylligare hår</em>
        </h2>
        <p className="hts-sub">Från förpackning till perfekt resultat på under 60 sekunder.</p>
      </div>

      <div className="hts-grid">
        {STEPS.map((step) => (
          <div key={step.num} className="hts-card">
            <div className="hts-num">{step.num}</div>
            <h3 className="hts-title">{step.title}</h3>
            <p className="hts-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowToSteps;
