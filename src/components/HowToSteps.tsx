import React from "react";
import "./HowToSteps.css";
import step1 from "../assets/stock.svg";
import step2 from "../assets/stock.svg";
import step3 from "../assets/stock.svg";

const HowToSteps: React.FC = () => {
  const steps = [
    {
      id: 1,
      image: step1,
      alt: "1. Skaka flaskan",
      title: "1. Skaka flaskan",
      description: "Skaka flaskan ordentligt före användning för att aktivera fibrerna.",
    },
    {
      id: 2,
      image: step2,
      alt: "2. Applicera",
      title: "2. Applicera",
      description: "Strö fibrerna över de områden du vill täcka. Klappa försiktigt för att fixera.",
    },
    {
      id: 3,
      image: step3,
      alt: "3. Fixera",
      title: "3. Fixera",
      description:
        "Spraya lätt med hårspray för att låsa fast fibrerna hela dagen. Resultatet sitter tills du tvättar håret.",
    },
  ];

  return (
    <section
      id="shopify-section-template--26436321640792__steps_NPBhYa"
      className="shopify-section"
    >
      <section
        className="results-steps-section section-template--26436321640792__steps_NPBhYa page-fade-in"
        role="region"
        aria-label="Såhär använder du Mello Hair Filler"
        data-show-images="true"
      >
        <div className="steps-content-wrapper">
          <h2 className="section-title global-heading">
            Så här använder du{" "}
            <span className="global-accent-text">
              <strong>Mello Hair Filler</strong>
            </span>
          </h2>

          <div className="steps-subtitle-wrapper">
            <p className="steps-section-subtitle">Följ dessa 3 enkla steg</p>
          </div>

          <div className="steps-container-desktop desktop-only">
            <div className="steps-container" data-show-numbers="false">
              <div className="steps-regular-layout">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="step-item"
                    data-step={step.id}
                    style={
                      {
                        "--image-bg-color": "#000000",
                        "--content-bg-color": "#ffffff",
                      } as React.CSSProperties
                    }
                  >
                    <div className="step-card">
                      <div className="step-image-container">
                        <img
                          className="step-image"
                          src={step.image}
                          alt={step.alt}
                          loading="lazy"
                          width=""
                          height=""
                          decoding="async"
                          draggable="false"
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

          <div className="steps-container-mobile mobile-only">
            <div
              className="steps-container"
              data-mobile-layout="horizontal"
              data-show-numbers="false"
            >
              <div className="steps-regular-layout">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="step-item"
                    data-step={step.id}
                    style={
                      {
                        "--image-bg-color": "#000000",
                        "--content-bg-color": "#ffffff",
                      } as React.CSSProperties
                    }
                  >
                    <div className="step-card">
                      <div className="step-image-container">
                        <img
                          className="step-image"
                          src={step.image}
                          alt={step.alt}
                          loading="lazy"
                          width=""
                          height=""
                          decoding="async"
                          draggable="false"
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
    </section>
  );
};

export default HowToSteps;
