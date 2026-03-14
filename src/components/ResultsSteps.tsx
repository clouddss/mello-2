import React from "react";
import "./ResultsSteps.css";

interface Step {
  id: number;
  image: string;
  title: string;
  description: string;
  alt: string;
}

import stockImage from "../assets/stock.svg";
const res1 = stockImage;
const res2 = stockImage;
const res3 = stockImage;

const stepsData: Step[] = [
  {
    id: 1,
    image: res1,
    title: "NATURLIG TÄCKNING",
    description:
      "Mello Hair Filler ger en omedelbar och naturlig täckning av tunnhåriga områden. Fiberna smälter sömlöst in i ditt befintliga hår.",
    alt: "NATURLIG TÄCKNING",
  },
  {
    id: 2,
    image: res2,
    title: "SITTER HELA DAGEN",
    description:
      "Vår avancerade formula sitter säkert på plats hela dagen, oavsett väder. Vind-, regn- och svettsäker för maximal trygghet.",
    alt: "SITTER HELA DAGEN",
  },
  {
    id: 3,
    image: res3,
    title: "ENKEL APPLICERING",
    description:
      "Få ett fylligare hår på bara 30 sekunder. Enkel att applicera och tvättas enkelt ur med vanligt schampo.",
    alt: "ENKEL APPLICERING",
  },
];

const ResultsSteps: React.FC = () => {
  return (
    <section
      className="results-steps-section section-template--26436321640792__steps_PdwHhk page-fade-in"
      role="region"
      aria-label="Få fylligare hår"
      data-show-images="true"
    >
      <div className="steps-content-wrapper">
        <h2 className="section-title global-heading">
          Varför välja just{" "}
          <span className="global-accent-text">Mello Hair Filler?</span>
        </h2>

        {/* Desktop Layout */}
        <div className="steps-container-desktop desktop-only">
          <div className="steps-container" data-show-numbers="false">
            <div className="steps-regular-layout">
              {stepsData.map((step) => (
                <div
                  key={step.id}
                  className="step-item"
                  data-step={step.id}
                  style={
                    {
                      "--image-bg-color": "#f5f5f5",
                      "--content-bg-color": "#ffffff",
                    } as React.CSSProperties
                  }
                >
                  <div className="step-card">
                    <div className="step-image-container">
                      <img
                        className="step-image"
                        src={step.image}
                        srcSet={`${step.image} 309w, ${step.image.replace("width=309", "width=618")} 618w, ${step.image.replace("width=309", "width=927")} 927w`}
                        sizes="(max-width:768px) 100vw, 25vw"
                        alt={step.alt}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                    <div className="step-content">
                      <div className="step-title-container">
                        <h3 className="step-title">{step.title}</h3>
                      </div>
                      <p className="step-description global-text">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="steps-container-mobile mobile-only">
          <div
            className="steps-container"
            data-mobile-layout="vertical"
            data-show-numbers="false"
          >
            <div className="steps-regular-layout">
              {stepsData.map((step) => (
                <div
                  key={step.id}
                  className="step-item"
                  data-step={step.id}
                  style={
                    {
                      "--image-bg-color": "#f5f5f5",
                      "--content-bg-color": "#ffffff",
                    } as React.CSSProperties
                  }
                >
                  <div className="step-card">
                    <div className="step-image-container">
                      <img
                        className="step-image"
                        src={step.image}
                        srcSet={`${step.image} 309w, ${step.image.replace("width=309", "width=618")} 618w, ${step.image.replace("width=309", "width=927")} 927w`}
                        sizes="100vw"
                        alt={step.alt}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                    <div className="step-content">
                      <div className="step-title-container">
                        <h3 className="step-title">{step.title}</h3>
                      </div>
                      <p className="step-description global-text">
                        {step.description}
                      </p>
                    </div>
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

export default ResultsSteps;
