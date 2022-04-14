import React from "react";

function FilterButton({ setFilter, name }) {
  return (
    <button
      data-testid="filter-button"
      type="button"
      className="btn toggle-btn"
      onClick={() => setFilter(name)}
    >
      <span>{name}</span>
    </button>
  );
}

export default FilterButton;
