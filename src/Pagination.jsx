import React from 'react';

const Pagination = ({ goPrev, goNext, currentPage, totalItems, maxItemsOnPage }) => {
  const isPrevPageAvailable = currentPage > 1;
  const isNextPageAvailable = Math.ceil(totalItems / maxItemsOnPage) > currentPage;
  return (
    <div className="pagination">
      <button className="pagination__btn" onClick={goPrev} disabled={!isPrevPageAvailable}>
        {isPrevPageAvailable && '←'}
      </button>
      <span className="pagination__page">{currentPage}</span>
      <button className="pagination__btn" onClick={goNext} disabled={!isNextPageAvailable}>
        {isNextPageAvailable && '→'}
      </button>
    </div>
  );
};

export default Pagination;
