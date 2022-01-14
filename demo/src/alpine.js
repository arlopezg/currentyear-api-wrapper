import Alpine from "alpinejs";
import { getTimezones as timezones } from "currentyear-api-wrapper";

const createStore = () => {
  Alpine.store("timezones", {
    all: [],
    current: "",
    selected: [""],
    randomize() {
      this.selected = this.selected.map(
        () => this.all[getRandom(0, this.all.length)]
      );
    },
  });
};

const getRandom = (min = 0, max = 100) => {
  return Math.floor(Math.random() * max) + min;
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
