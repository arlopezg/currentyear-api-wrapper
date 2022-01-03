/**
 * @extends {Error}
 */
export class TimezoneError extends Error {
  name = "TimezoneError";

  constructor(timezone: string) {
    super(`Invalid or missing timezone: "${timezone}" could not be found`);
  }
}
