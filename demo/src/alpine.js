import Alpine from "alpinejs";
import { getTimezones as timezones } from "currentyear-api-wrapper";

const createStore = () => {
  Alpine.store("timezones", {
    all: [],
    current: "",
    selected: [],
  });
};

const getTimezones = async () => {
  Alpine.store("timezones").all = await timezones();
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
  const setupMethods = [
    exposePublicMethods,
    createStore,
    getTimezones,
    Alpine.start,
  ];
  setupMethods.forEach((fn) => fn());
};
