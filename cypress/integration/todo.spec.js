/// <reference types="cypress" />

import { FILTER_NAMES } from "../../src/components/FilterList";
import { localStorageKey } from "../../src/App";

const item1 = "Feed the cat";
const item2 = "Cut hair";
const item3 = "Wash dishes";

const firstTodo = () => cy.get(".todo").eq(0);
const secondTodo = () => cy.get(".todo").eq(1);
const thirdTodo = () => cy.get(".todo").eq(2);

const addTasks = () => {
  cy.get(".todo").should("have.length", 0);
  cy.get("#list-heading").should("have.text", "0 tasks remaining");

  cy.get("#new-todo-input").type(`{enter}`);
  cy.get(".todo").should("have.length", 0);

  cy.get("#new-todo-input").type(`${item1}{enter}`);
  cy.get(".todo").should("have.length", 1);
  cy.get("#list-heading").should("have.text", "1 task remaining");

  cy.get("#new-todo-input").type(`${item2}{enter}`);
  cy.get(".todo").should("have.length", 2);
  cy.get("#list-heading").should("have.text", "2 tasks remaining");

  cy.get("#new-todo-input").type(`${item3}`);
  cy.get(".btn").contains("Add").click();
  cy.get(".todo").should("have.length", 3);
  cy.get("#list-heading").should("have.text", "3 tasks remaining");

  firstTodo().find(".todo-label").should("have.text", item1);
  secondTodo().find(".todo-label").should("have.text", item2);
  thirdTodo().find(".todo-label").should("have.text", item3);
};

describe("Todo app test", () => {
  it("should be able to add new tasks", () => {
    cy.visit("http://localhost:3000/");

    addTasks();
  });

  it("should be able to filter tasks by status", () => {
    cy.visit("http://localhost:3000/");

    addTasks();

    firstTodo().should("not.be.checked");
    secondTodo().should("not.be.checked");
    thirdTodo().should("not.be.checked");

    firstTodo().find("input").click();

    firstTodo().find("input").should("be.checked");
    secondTodo().find("input").should("not.be.checked");
    thirdTodo().find("input").should("not.be.checked");

    thirdTodo().find("input").click();

    firstTodo().find("input").should("be.checked");
    secondTodo().find("input").should("not.be.checked");
    thirdTodo().find("input").should("be.checked");

    cy.get(".toggle-btn").contains(FILTER_NAMES.Active).click();
    cy.get(".todo").should("have.length", 1);
    cy.get("#list-heading").should("have.text", "3 tasks remaining");

    cy.get(".toggle-btn").contains(FILTER_NAMES.Completed).click();
    cy.get(".todo").should("have.length", 2);
    cy.get("#list-heading").should("have.text", "3 tasks remaining");

    cy.get(".toggle-btn").contains(FILTER_NAMES.All).click();
    cy.get(".todo").should("have.length", 3);
    cy.get("#list-heading").should("have.text", "3 tasks remaining");
  });

  it("should be able to delete tasks", () => {
    cy.visit("http://localhost:3000/");

    addTasks();

    firstTodo().contains("Delete").click();

    cy.get(".todo").should("have.length", 2);
    cy.get("#list-heading").should("have.text", "2 tasks remaining");
    firstTodo().find(".todo-label").should("have.text", item2);
    secondTodo().find(".todo-label").should("have.text", item3);

    secondTodo().contains("Delete").click();

    cy.get(".todo").should("have.length", 1);
    cy.get("#list-heading").should("have.text", "1 task remaining");
    firstTodo().find(".todo-label").should("have.text", item2);

    firstTodo().contains("Delete").click();

    cy.get(".todo").should("have.length", 0);
    cy.get("#list-heading").should("have.text", "0 tasks remaining");
  });

  it("should be able to edit tasks", () => {
    cy.visit("http://localhost:3000/");

    addTasks();

    const nameChange1 = "Name change 1";
    firstTodo().contains("Edit").click();
    cy.get(".todo-text").clear().type(nameChange1);
    cy.get(".btn").contains("Save").click();
    firstTodo().find(".todo-label").should("have.text", nameChange1);

    const nameChange2 = "Name change 2";
    secondTodo().contains("Edit").click();
    cy.get(".todo-text").clear().type(nameChange2);
    cy.contains("Cancel").click();
    secondTodo().find(".todo-label").should("have.text", item2);
    secondTodo().contains("Edit").click();
    cy.get(".todo-text").clear().type(nameChange2);
    cy.contains("Save").click();
    secondTodo().find(".todo-label").should("have.text", nameChange2);

    const nameChange3 = "Name change 3";
    thirdTodo().contains("Edit").click();
    cy.get(".todo-text").clear();
    cy.contains("Save").click();
    cy.get(".btn").contains("Save").should("exist");
    cy.get(".todo-text").type(nameChange3);
    cy.contains("Save").click();
    cy.get(".btn").contains("Save").should("not.exist");
    thirdTodo().find(".todo-label").should("have.text", nameChange3);
  });

  it("should get tasks from localStorage", () => {
    const tasksString = `[{"id":"todo-uYzBz8yGS4qqWZkNCvSnd","name":"${item1}","completed":false},{"id":"todo-Bo57QYVJwx7U9FGxRKrVC","name":"${item2}","completed":true},{"id":"todo-cj6Qg6ZtghTVWCcfOWdUQ","name":"${item3}","completed":false}]`;
    window.localStorage.setItem(localStorageKey, tasksString);

    cy.visit("http://localhost:3000/");

    firstTodo().find(".todo-label").should("have.text", item1);
    secondTodo().find(".todo-label").should("have.text", item2);
    thirdTodo().find(".todo-label").should("have.text", item3);

    firstTodo().find("input").should("not.be.checked");
    secondTodo().find("input").should("be.checked");
    thirdTodo().find("input").should("not.be.checked");
  });
});
