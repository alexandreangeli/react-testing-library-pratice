import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

global.beforeEach(() => {
  window.localStorage.clear();
  jest.restoreAllMocks();
});

const nodeCrypto = require("crypto");
window.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer);
  },
};

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});
