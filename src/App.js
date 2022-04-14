import React, { useState, useCallback } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import FilterList from "./components/FilterList";
import { FILTER_NAMES } from "./components/FilterList";

export const localStorageKey = "rtl-cypress-tests-data";

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function App() {
  const [filter, setFilter] = useState(FILTER_NAMES.All);
  const [tasks, setTasks] = useState(
    JSON.parse(window.localStorage.getItem(localStorageKey) || "[]")
  );
  const handleSetTasks = useCallback((newTasks) => {
    setTasks(newTasks);
    window.localStorage.setItem(localStorageKey, JSON.stringify(newTasks));
  }, []);

  function addTask(name) {
    const newTask = { id: "todo-" + uuidv4(), name: name, completed: false };
    handleSetTasks([...tasks, newTask]);
  }

  return (
    <div data-testid="app" className="todoapp stack-large">
      <Form addTask={addTask} />
      <FilterList onUpdateFilter={setFilter} />
      <TodoList tasks={tasks} filter={filter} onUpdateTasks={handleSetTasks} />
    </div>
  );
}

export default App;
