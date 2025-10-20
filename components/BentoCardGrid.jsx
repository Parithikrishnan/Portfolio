import React from 'react';
import './BentoCardGrid.css'; // New CSS for the grid layout

const BentoCardGrid = ({ children, gridRef }) => (
  <div className="card-grid bento-section" ref={gridRef}>
    {children}
  </div>
);

export default BentoCardGrid;