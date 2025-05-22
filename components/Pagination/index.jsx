import React from 'react';

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div style={{ marginTop: '-100px', marginBottom: '80px' }}>
      <ul className="cs_pagination_box">
        <li>
          <button onClick={handlePrev} className="cs_pagination_arrow cs_center">
            <img src="images/icons/left_arrow_blue.svg" alt="Prev" />
          </button>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`cs_pagination_item cs_center ${page === currentPage ? 'active' : ''}`}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          <button onClick={handleNext} className="cs_pagination_arrow cs_center">
            <img src="images/icons/right_arrow_blue.svg" alt="Next" />
          </button>
        </li>
      </ul>
    </div>
  );
}
