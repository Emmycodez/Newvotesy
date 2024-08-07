import React from 'react';

const MenuSvg = ({ openNavigation }) => {
  return (
    <svg
      className="overflow-visible"
      width="20"
      height="12"
      viewBox="0 0 20 12"
    >
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "0"}
        width="20"
        height="2"
        rx="1"
        fill="#E1306C"          // Fill color of the bars (pink)
        stroke="#E1306C"        // Border color (pink)
        strokeWidth="3"         // Border thickness
        strokeDasharray="4"     // Dotted border
        transform={`rotate(${openNavigation ? "45" : "0"})`}
      />
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "10"}
        width="20"
        height="2"
        rx="1"
        fill="#E1306C"          // Fill color of the bars (pink)
        stroke="#E1306C"        // Border color (pink)
        strokeWidth="3"         // Border thickness
        strokeDasharray="4"     // Dotted border
        transform={`rotate(${openNavigation ? "-45" : "0"})`}
      />
    </svg>
  );
};

export default MenuSvg;
