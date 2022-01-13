export const getTimezones = async (): Promise<string[]> => {
  const response = await import("timezones-list");
  return response.default
    .map((tz) => tz.tzCode)
    .sort((prev = "", next = "") => prev.localeCompare(next));
};
