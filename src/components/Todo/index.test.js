import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Todo from ".";
import userEvent from "@testing-library/user-event";

let id;
let name;
let completed;
let editTask;
let deleteTask;
let toggleTaskCompleted;

let newName;

beforeEach(() => {
  id = "id";
  name = "name";
  completed = false;
  editTask = jest.fn();
  toggleTaskCompleted = jest.fn();
  deleteTask = jest.fn();
  newName = "new name";
});

const renderComponent = () => {
  render(
    <Todo
      id={id}
      name={name}
      completed={completed}
      editTask={editTask}
      deleteTask={deleteTask}
      toggleTaskCompleted={toggleTaskCompleted}
    />
  );
};

const goToEdition = () => {
  const editButton = screen.getByRole("button", { name: "Edit" });
  userEvent.click(editButton);
};

const todoViewIsRendered = () => {
  expect(screen.queryByText(name)).toBeInTheDocument();
  expect(screen.queryByRole("checkbox")).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Edit" })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Delete" })).toBeInTheDocument();
};

const todoViewIsNotRendered = () => {
  expect(screen.queryByText(name)).not.toBeInTheDocument();
  expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Edit" })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Delete" })
  ).not.toBeInTheDocument();
};

const todoEditIsRendered = () => {
  expect(screen.queryByText("New name for " + name)).toBeInTheDocument();
  expect(screen.queryByRole("textbox")).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Cancel" })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Save" })).toBeInTheDocument();
};

const todoEditIsNotRendered = () => {
  expect(screen.queryByText("New name for " + name)).not.toBeInTheDocument();
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Cancel" })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Save" })
  ).not.toBeInTheDocument();
};

const typeNewName = () => {
  const textbox = screen.getByRole("textbox");
  expect(textbox).toHaveValue(name);
  userEvent.type(textbox, newName);
  expect(textbox).toHaveValue(newName);
};

describe("<Todo />", () => {
  it("should render with status checkbox, name label, and buttons without crashing", () => {
    renderComponent();

    expect(screen.getByTestId("todo-item")).toBeInTheDocument();

    todoViewIsRendered();
  });

  it("should toggle status correctly when started as uncompleted", () => {
    completed = false;
    renderComponent();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(toggleTaskCompleted).toBeCalledTimes(1);

    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(toggleTaskCompleted).toBeCalledTimes(2);

    expect(toggleTaskCompleted).toBeCalledWith(id);
  });

  it("should toggle status correctly when started as completed", () => {
    completed = true;
    renderComponent();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(toggleTaskCompleted).toBeCalledTimes(1);

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(toggleTaskCompleted).toBeCalledTimes(2);

    expect(toggleTaskCompleted).toBeCalledWith(id);
  });

  it("should render todo edition without crashing", () => {
    renderComponent();

    todoViewIsRendered();
    todoEditIsNotRendered();

    goToEdition();

    todoEditIsRendered();
    todoViewIsNotRendered();
  });

  it("should go back to todo view when clicking cancel inside edition without changing name", () => {
    renderComponent();

    goToEdition();

    typeNewName();

    userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    todoViewIsRendered();
    todoEditIsNotRendered();

    expect(editTask).toHaveBeenCalledTimes(0);
  });

  it("should save name edition correctly", () => {
    renderComponent();

    goToEdition();

    typeNewName();

    userEvent.click(screen.getByRole("button", { name: "Save" }));

    todoViewIsRendered();
    todoEditIsNotRendered();

    expect(editTask).toHaveBeenCalledTimes(1);
    expect(editTask).toHaveBeenCalledWith(id, newName);
  });

  it("should delete task", () => {
    renderComponent();

    expect(deleteTask).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(deleteTask).toHaveBeenCalledTimes(1);
    expect(deleteTask).toHaveBeenCalledWith(id);
  });

  it("should show delete button only when not editing", () => {
    renderComponent();

    expect(
      screen.queryByRole("button", { name: "Delete" })
    ).toBeInTheDocument();

    goToEdition();

    expect(
      screen.queryByRole("button", { name: "Delete" })
    ).not.toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(
      screen.queryByRole("button", { name: "Delete" })
    ).toBeInTheDocument();
  });
});
