import React from "react";
import { render } from "@testing-library/react";
import TodoList from ".";
import { screen } from "@testing-library/dom";
import { FILTER_NAMES } from "../FilterList";

let tasks;
let filter;
let onUpdateTasks;

beforeEach(() => {
  tasks = [
    { completed: true, id: "1", name: "Name 1" },
    { completed: false, id: "2", name: "Name 2" },
    { completed: true, id: "3", name: "Name 3" },
    { completed: false, id: "4", name: "Name 4" },
    { completed: true, id: "5", name: "Name 5" },
  ];
  filter = FILTER_NAMES.All;
  onUpdateTasks = jest.fn();
});

const renderComponent = () => {
  render(
    <TodoList tasks={tasks} filter={filter} onUpdateTasks={onUpdateTasks} />
  );
};

const headingShowCorrectNumberOfTasks = () => {
  expect(screen.queryByTestId("list-heading")).toHaveTextContent(
    tasks.length + " tasks remaining"
  );
};

describe("<TodoList />", () => {
  it("should render without crashing", () => {
    renderComponent();
    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
  });

  it("should render all items when filter is All", () => {
    renderComponent();

    const todoItems = screen.getAllByTestId("todo-item");
    expect(todoItems).toHaveLength(tasks.length);

    todoItems.forEach((todoItem, i) => {
      expect(todoItem).toHaveTextContent(tasks[i].name);
    });

    headingShowCorrectNumberOfTasks();
  });

  it("should render only unchecked items when filter is Active", () => {
    filter = FILTER_NAMES.Active;

    renderComponent();

    const notCompletedTasks = tasks.filter((t) => !t.completed);
    const todoItems = screen.getAllByTestId("todo-item");
    expect(todoItems).toHaveLength(notCompletedTasks.length);

    todoItems.forEach((todoItem, i) => {
      expect(todoItem).toHaveTextContent(notCompletedTasks[i].name);
    });

    headingShowCorrectNumberOfTasks();
  });

  it("should render only checked items when filter is Completed", () => {
    filter = FILTER_NAMES.Completed;

    renderComponent();

    const completedTasks = tasks.filter((t) => t.completed);
    const todoItems = screen.getAllByTestId("todo-item");
    expect(todoItems).toHaveLength(completedTasks.length);

    todoItems.forEach((todoItem, i) => {
      expect(todoItem).toHaveTextContent(completedTasks[i].name);
    });

    headingShowCorrectNumberOfTasks();
  });
});
