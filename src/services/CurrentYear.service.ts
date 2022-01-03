import timezones from "timezones-list";

import { HttpService } from ".";
import { TimezoneError } from "../exceptions";

/**
 * Handles everything related to the CurrentYear API.
 * @access public
 * @example const service = new CurrentYearService();
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
   * Prevents requesting non-existing timezones
   * @param {string} tzCode Timezone Code to be validated
   * @throws A detailed error message if the requested timezone does not exist
   */
  private abortIfBadTimezone(tzCode: string): void {
    if (this.timezones.some((tz) => tz === tzCode)) {
      return;
    }
    throw new TimezoneError(tzCode);
  }

  /**
   * @async
   * @link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   * @param {string} timezone Desired timezone, following the TZ format
   * @example await service.getCurrentYear("America/New_York")
   * @returns Current year on specified timezone as a string. If no timezone is required it assumes UTC.
   * @throws `TimezoneError` if invalid timezone
   */
  async getCurrentYear(timezone?: string): Promise<string> {
    timezone && this.abortIfBadTimezone(timezone);
    return (await this.http.get(`/what-year-is-it?in=${timezone}`)) as string;
  }

  /**
   * @async
   * @link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   * @param {string[]} timezones Desired timezones, following the TZ format
   * @example await service.getCurrentYearOnManyTimezones(["America/New_York", "Europe/Madrid"])
   * @returns Current year on specified timezones as a a tuple list.
   */
  async getCurrentYearOnManyTimezones(
    timezones: string[]
  ): Promise<[string, string][]> {
    return await Promise.all(
      timezones.map(async (t) => [t, await this.getCurrentYear(t)])
    );
  }
}
