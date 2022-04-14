import React from "react";
import FilterButton from "../FilterButton";

export const FILTER_NAMES = {
  All: "All",
  Active: "Active",
  Completed: "Completed",
};

export const FILTER_MAP = {
  [FILTER_NAMES.All]: () => true,
  [FILTER_NAMES.Active]: (task) => !task.completed,
  [FILTER_NAMES.Completed]: (task) => task.completed,
};

function FilterList({ onUpdateFilter }) {
  return (
    <div
      data-testid="filter-list"
      className="filters btn-group stack-exception"
    >
      {Object.values(FILTER_NAMES).map((name) => (
        <FilterButton key={name} name={name} setFilter={onUpdateFilter} />
      ))}
    </div>
  );
}

export default FilterList;
