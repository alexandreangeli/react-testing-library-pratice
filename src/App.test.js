import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import App, { localStorageKey } from "./App";
import userEvent from "@testing-library/user-event";

const renderComponent = () => {
  render(<App />);
};

describe("<App />", () => {
  it("should render without crashing", () => {
    renderComponent();

    expect(screen.getAllByTestId("add-form")).toHaveLength(1);
    expect(screen.getAllByTestId("filter-list")).toHaveLength(1);
    expect(screen.getAllByTestId("todo-list")).toHaveLength(1);
  });

  it("should render 0 tasks if has nothing inside localStorage", () => {
    const getItemSpy = jest.spyOn(window.localStorage, "getItem");
    expect(getItemSpy).not.toHaveBeenCalled();

    renderComponent();

    expect(getItemSpy).toHaveBeenCalledTimes(1);
    expect(getItemSpy).toHaveBeenCalledWith(localStorageKey);

    expect(screen.queryAllByTestId("todo-item")).toHaveLength(0);
  });

  it("should render correct tasks if has tasks inside localStorage", () => {
    const getItemSpy = jest.spyOn(window.localStorage, "getItem");
    const tasksString =
      '[{"id":"todo-uYzBz8yGS4qqWZkNCvSnd","name":"Teste","completed":false},{"id":"todo-Bo57QYVJwx7U9FGxRKrVC","name":"Teste 2","completed":true},{"id":"todo-cj6Qg6ZtghTVWCcfOWdUQ","name":"Teste 3","completed":false}]';
    window.localStorage.setItem(localStorageKey, tasksString);
    expect(getItemSpy).not.toHaveBeenCalled();

    renderComponent();

    expect(getItemSpy).toHaveBeenCalledTimes(1);
    expect(getItemSpy).toHaveBeenCalledWith(localStorageKey);

    expect(screen.queryAllByTestId("todo-item")).toHaveLength(3);
  });

  it("should call setItem when deleting, editing and adding tasks", () => {
    const setItemSpy = jest.spyOn(window.localStorage, "setItem");
    renderComponent();

    expect(setItemSpy).toHaveBeenCalledTimes(0);

    userEvent.type(screen.getByRole("textbox"), "New Task");
    userEvent.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.queryAllByTestId("todo-item")).toHaveLength(1);
    expect(setItemSpy).toHaveBeenCalledTimes(1);

    userEvent.click(screen.getAllByRole("button", { name: "Edit" })[0]);
    userEvent.type(document.querySelector(".todo-text"), "New Name");
    userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.queryAllByTestId("todo-item")).toHaveLength(1);
    expect(setItemSpy).toHaveBeenCalledTimes(2);

    userEvent.click(screen.queryAllByRole("button", { name: "Delete" })[0]);
    expect(screen.queryAllByTestId("todo-item")).toHaveLength(0);
    expect(setItemSpy).toHaveBeenCalledTimes(3);
  });
});
