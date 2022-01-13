import { MissingTimezonesError, TimezoneError } from ".";

import { getTimezones } from "../utils";

describe("Exceptions", () => {
  describe("TimezoneError", () => {
    it("Should describe the failing tzCode", () => {
      const instance = new TimezoneError("foo");

      expect(instance.message).toContain("Invalid or missing timezone:");
      expect(instance.message).toContain("foo");
    });
  });

  describe("MissingTimezonesError", () => {
    let timezones: string[];
    const { minimumTimezoneCount } = new MissingTimezonesError();

    const throwIfNotEnoughTzs = (tzs: string[]) => {
      if (tzs.length < minimumTimezoneCount) {
        throw new MissingTimezonesError(tzs);
      }
    };

    beforeAll(async () => (timezones = await getTimezones()));
    it("Should fail on not enough timezones", () => {
      expect(() => throwIfNotEnoughTzs([])).toThrow(MissingTimezonesError);
      expect(() => throwIfNotEnoughTzs([timezones[0]])).toThrow(MissingTimezonesError);
    });
    it("Should do nothing on enough timezones", () => {
      expect(() =>
        throwIfNotEnoughTzs([timezones[0], timezones[1]])
      ).not.toThrow();
    });
  });
});
