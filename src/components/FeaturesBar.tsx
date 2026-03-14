import React from 'react';
import './FeaturesBar.css';

const FeaturesBar: React.FC = () => {
    const features = [
        {
          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
          text: "Pengar tillbaka garanti"
        },
        {
          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>,
          text: "Smidig och skonsam användning"
        },
        {
          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="m4.93 4.93 14.14 14.14"></path><path d="M2 12h20"></path><path d="m19.07 4.93-14.14 14.14"></path></svg>,
          text: "Synlig bränna snabbare"
        }
      ];
      

  // Repeat items to ensure smooth scrolling
  const duplicatedFeatures = [...features, ...features, ...features, ...features];

  return (
    <div className="features-bar-section pause-on-hover">
      <div className="features-bar-track-container">
        <div className="features-bar-track">
          <div className="features-bar-items">
            {duplicatedFeatures.map((feature, index) => (
              <React.Fragment key={index}>
                <div className="features-bar-item">
                  <div className="features-bar-icon">
                    {feature.icon}
                  </div>
                  <span>{feature.text}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="features-bar-items">
            {duplicatedFeatures.map((feature, index) => (
              <React.Fragment key={`dup-${index}`}>
                <div className="features-bar-item">
                  <div className="features-bar-icon">
                    {feature.icon}
                  </div>
                  <span>{feature.text}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBar;
