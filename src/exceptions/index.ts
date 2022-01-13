/**
 * @extends {Error}
 */
export class TimezoneError extends Error {
  readonly name = "TimezoneError";

  constructor(timezone: string) {
    super(`Invalid or missing timezone: "${timezone}" could not be found`);
  }
}

/**
 * @extends {Error}
 */
export class MissingTimezonesError extends Error {
  readonly name = "MissingTimezonesError";
  readonly minimumTimezoneCount = 2;

  constructor(timezones: string[] = []) {
    super(`Not enough timezones. Expected >=2, received ${timezones.length}`);
  }
}
