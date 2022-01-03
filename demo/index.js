import { CurrentYearService } from "../dist/index";

const init = () => {
  const currentYearService = new CurrentYearService();
  const footerYear = document.querySelector(".footer__year");

  footerYear.innerHTML = await currentYearService.getCurrentYear();
};

document.addEventListener("DOMContentLoaded", () => init);
