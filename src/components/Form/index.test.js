import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import Form from ".";

let addTask;

const renderComponent = () => {
  render(<Form addTask={addTask} />);
};

beforeEach(() => {
  addTask = jest.fn();
});

describe("<Form />", () => {
  it("should render with title, textbox and button without crashing", () => {
    renderComponent();

    expect(screen.getByTestId("add-form")).toBeInTheDocument();

    expect(screen.getByText("What needs to be done?")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("should not call addTask function if form was not filled", () => {
    renderComponent();

    userEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(addTask).toHaveBeenCalledTimes(0);
  });

  it("should call addTask function if form was filled", () => {
    renderComponent();

    const taskName = "Teste";
    userEvent.type(screen.getByRole("textbox"), taskName);
    userEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addTask).toHaveBeenCalledWith(taskName);
  });
});
