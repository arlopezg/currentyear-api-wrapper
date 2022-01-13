import { HttpService } from ".";
import { MissingTimezonesError, TimezoneError } from "../exceptions";
import { getTimezones } from "../utils";

/**
 * Handles everything related to the CurrentYear API.
 * @access public
 * @example const service = new CurrentYearService();
 * @link https://current-year-api.addy.codes/
 * @property {number=300} waitBetweenRequests Time in ms to wait between calls to the API
 */
export class CurrentYearService {
  waitBetweenRequests: number;

  private http: HttpService;

  constructor(waitBetweenRequests?: number) {
    this.http = new HttpService("https://current-year-api.addy.codes");
    this.waitBetweenRequests = waitBetweenRequests || 300;
  }

  /**
   * Prevents requesting non-existing timezones
   * @param tzCode Timezone Code to be validated
   * @throws A detailed error message if the requested timezone does not exist
   */
  private async abortIfBadTimezone(tzCode = ""): Promise<void> {
    const timezones = await getTimezones();
    if (!tzCode || timezones.some((tz) => tz === tzCode)) {
      return;
    }
    throw new TimezoneError(tzCode);
  }

  /**
   * @async
   * @param {string} timezone Desired timezone, following the TZ format
   * @example await service.getCurrentYear("America/New_York")
   * @returns Current year on specified timezone as a string. If no timezone is required it assumes UTC.
   * @throws `TimezoneError` if invalid timezone
   */
  async getCurrentYear(timezone?: string): Promise<string> {
    await this.abortIfBadTimezone(timezone);
    return (await this.http.get(`/what-year-is-it?in=${timezone}`)) as string;
  }

  /**
   * @async
   * @param {string[]} timezones Desired timezones, following the TZ format
   * @example await service.getCurrentYearOnManyTimezones(["America/New_York", "Europe/Madrid"])
   * @returns Current year on specified timezones as a a tuple list.
   */
  async getCurrentYearOnManyTimezones(
    timezones: string[]
  ): Promise<[string, string][]> {
    if (timezones.length < 2) {
      throw new MissingTimezonesError(timezones);
    }
    return await Promise.all(
      timezones.map(async (t) => [t, await this.getCurrentYear(t)])
    );
  }
}
