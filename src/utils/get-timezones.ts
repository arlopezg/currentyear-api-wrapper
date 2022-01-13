/**
 * Async-load the list of available timezones.
 * Uses a dynamic import to further reduce the bundle size.
 * @link https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * @returns {Promise} List of timezone codes
 */
export const getTimezones = async (): Promise<string[]> => {
  const response = await import("timezones-list");
  return response.default
    .map((tz) => tz.tzCode)
    .sort((prev = "", next = "") => prev.localeCompare(next));
};
