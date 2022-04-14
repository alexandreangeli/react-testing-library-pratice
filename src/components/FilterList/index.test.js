import React from "react";
import { render } from "@testing-library/react";
import FilterList from ".";
import { screen } from "@testing-library/dom";
import { FILTER_NAMES } from "./index";
import userEvent from "@testing-library/user-event";

let onUpdateFilter;

beforeEach(() => {
  onUpdateFilter = jest.fn();
});

const renderComponent = () => {
  render(<FilterList onUpdateFilter={onUpdateFilter} />);
};

describe("<FilterList />", () => {
  it("should render without crashing", () => {
    renderComponent();

    expect(screen.getByTestId("filter-list")).toBeInTheDocument();

    const filterButtons = screen.getAllByTestId("filter-button");
    expect(filterButtons).toHaveLength(3);

    filterButtons.forEach((filterButton, i) => {
      expect(filterButton).toHaveTextContent(Object.values(FILTER_NAMES)[i]);
    });
  });

  it("should pass filter name when button clicked", () => {
    renderComponent();

    const filterButtons = screen.getAllByTestId("filter-button");

    expect(onUpdateFilter).toHaveBeenCalledTimes(0);

    filterButtons.forEach((filterButton, i) => {
      userEvent.click(filterButton);
      expect(onUpdateFilter).toHaveBeenCalledTimes(i + 1);
      expect(onUpdateFilter).toHaveBeenLastCalledWith(
        Object.values(FILTER_NAMES)[i]
      );
    });
  });
});
