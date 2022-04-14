import React from "react";
import { render } from "@testing-library/react";
import FilterButton from ".";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

let setFilter;
let name;

beforeEach(() => {
  setFilter = jest.fn();
  name = "name";
});

const renderComponent = () => {
  render(<FilterButton setFilter={setFilter} name={name} />);
};

describe("<FilterButton />", () => {
  it("should render without crashing", () => {
    renderComponent();

    expect(screen.getByTestId("filter-button")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: name })).toBeInTheDocument();
  });

  it("should call it's own name when pressed", () => {
    renderComponent();

    expect(setFilter).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getByRole("button", { name: name }));

    expect(setFilter).toHaveBeenCalledTimes(1);
    expect(setFilter).toHaveBeenCalledWith(name);
  });
});
