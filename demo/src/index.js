import { CurrentYearService } from "currentyear-api-wrapper";
import { setupAlpine } from "./alpine";

const setCurrentYear = async () => {
  const currentYearService = new CurrentYearService();
  const year = await currentYearService.getCurrentYear();

  const footerYear = document.querySelector("#footer-year");
  footerYear.innerHTML = year;
  footerYear.setAttribute("aria-busy", false);
};

window.onload = () => {
  setupAlpine();
  setTimeout(setCurrentYear, 4000);
};
