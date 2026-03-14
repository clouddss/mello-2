import './AnnouncementBar.css';

const AnnouncementBar = () => {
  return (
    <div className="brand-topbar" role="note" aria-label="Store offers">
      <div className="brand-topbar-track">
        <span>FREE 2-DAY SHIPPING OVER $55</span>
        <span className="dot" />
        <span>CLINIC-GRADE HAIR FILLER FIBERS</span>
        <span className="dot" />
        <span>30-DAY CONFIDENCE GUARANTEE</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
