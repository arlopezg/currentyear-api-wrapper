import { CurrentYearService } from "currentyear-api-wrapper";
import { setupAlpine } from "./alpine";

const currentYearService = new CurrentYearService();
const setCurrentYear = async () => {
  const year = await currentYearService.getCurrentYear();

  const footerYear = document.querySelector("#footer-year");
  footerYear.innerHTML = year;
  footerYear.setAttribute("aria-busy", false);
};

const getCurrentYear = async (tz = "") => {
  return await currentYearService.getCurrentYear(tz);
};

window.setup = () => {
  return {
    getCurrentYear,
  };
};

window.onload = () => {
  setupAlpine();
  setTimeout(setCurrentYear, 4000);
};
