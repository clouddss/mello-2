import React from "react";
import "./ComparisonTable.css";

const FEATURES = [
  "Omedelbar effekt på 30 sekunder",
  "Naturliga keratinfibrer",
  "Håller hela dagen",
  "Godkänd av hudläkare",
  "30 dagars pengarna-tillbaka",
  "Fri frakt inkluderad",
];

const CheckYes = () => (
  <svg className="ct-icon ct-icon--yes" viewBox="0 0 256 256" width="24" height="24">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" fill="currentColor" />
  </svg>
);

const CheckNo = () => (
  <svg className="ct-icon ct-icon--no" viewBox="0 0 256 256" width="24" height="24">
    <path d="M128,24A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm36.44,132.88a8,8,0,0,1,0,11.31,8.17,8.17,0,0,1-11.31,0L128,143.31l-25.13,24.88a8.17,8.17,0,0,1-11.31,0,8,8,0,0,1,0-11.31L116.69,132,91.56,107.13a8,8,0,0,1,11.31-11.32L128,120.69l25.13-24.88a8,8,0,0,1,11.31,11.32L139.31,132Z" fill="currentColor" />
  </svg>
);

const BadgeIcon = () => (
  <svg viewBox="0 0 256 256" width="14" height="14" fill="currentColor">
    <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-52.2,6.84-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
  </svg>
);

const ComparisonTable: React.FC = () => (
  <section className="ct-section">
    <div className="ct-wrap">
      <div className="ct-header">
        <p className="ct-eyebrow">Se skillnaden</p>
        <h2 className="ct-main-heading">Varför välja <em>oss?</em></h2>
      </div>

      <div className="ct-table-wrap">
        <table className="ct-table">
          <thead>
            <tr>
              <th className="ct-col-feature">
                <h2 className="ct-heading"><em>Mello</em> vs. konkurrenterna</h2>
              </th>
              <th className="ct-col-us ct-th--highlighted">
                <div className="ct-th-title">Mello</div>
                <div className="ct-th-badge">
                  <BadgeIcon />
                  Hair Filler
                </div>
              </th>
              <th className="ct-col-them">
                <div className="ct-th-title--muted">Andra</div>
                <div className="ct-th-sub--muted">produkter</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((feat, i) => (
              <tr key={i} className={i % 2 === 0 ? "ct-row-even" : ""}>
                <td className="ct-feat-name">{feat}</td>
                <td className="ct-cell ct-cell--us"><CheckYes /></td>
                <td className="ct-cell"><CheckNo /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default ComparisonTable;
