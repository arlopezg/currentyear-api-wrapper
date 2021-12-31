import timezones from "timezones-list";

import { HttpService } from "./Http.service";

/**
 * Handles everything related to the CurrentYear API.
 * @link https://current-year-api.addy.codes/
 */
export class CurrentYearService {
  private http: HttpService;
  private timezones: string[];

  constructor() {
    this.http = new HttpService("https://current-year-api.addy.codes");
    this.timezones = timezones.map((t) => t.tzCode);
  }

  /**
   * Prevents requesting non-existing timezones, although it is an evolving standard
   * so it should be taken with a grain of salt.
   * @param {string} tzCode Timezone Code to be validated
   * @throws A detailed error message if the requested timezone does not exist
   */
  private abortIfBadTimezone(tzCode: string): void {
    if (this.timezones.some((tz) => tz === tzCode)) {
      return;
    }
    throw new Error(`Invalid timezone. "${tzCode}" could not be found`);
  }

  async getCurrentYear(timezone?: string): Promise<string> {
    try {
      timezone && this.abortIfBadTimezone(timezone);
      return (await this.http.get(`/what-year-is-it?in=${timezone}`)) as string;
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async getCurrentYearOnManyTimezones(
    _timezones: string[]
  ): Promise<[string, string][]> {
    // TODO
    // const response = await Promise.allSettled(
    //   timezones.map((t) => this.getCurrentYear(t))
    // );
    return [["foo", "bar"]];
  }
}
