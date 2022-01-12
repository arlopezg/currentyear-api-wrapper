import Alpine from "alpinejs";

const createStore = () => {
  Alpine.store("timezones", {
    current: null,
    all: [],
  });
};

const getTimezones = () => {

};

const exposePublicMethods = () => {
  window.Alpine = Alpine;
  window.getTimezones = getTimezones;
};
/**
 * Setup and init Alpine-related methods.
 * These methods must be run in this specific order,
 * where `Alpine.start` must be the last one to be executed.
 * @returns {void}
 * @link https://alpinejs.dev/advanced/extending#via-npm
 */
export const setupAlpine = () => {
  const setupMethods = [exposePublicMethods, createStore, Alpine.start];
  setupMethods.forEach((fn) => fn());
};
