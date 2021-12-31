import { CurrentYearService } from "./services";

const service = new CurrentYearService();
service.getCurrentYear("Pacific/Auckland").then((r) => console.log(r));
