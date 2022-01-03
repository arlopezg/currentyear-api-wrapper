import fetchMock from "jest-fetch-mock";

import { CurrentYearService } from ".";
import { TimezoneError } from "../exceptions";

describe("CurrentYearService", () => {
  let instance: CurrentYearService;

  const setMockYear = (year?: string): void => {
    fetchMock.mockResponse(
      JSON.stringify(year || new Date().getFullYear.toString())
    );
  };

  beforeEach(() => {
    instance = new CurrentYearService();
    fetchMock.resetMocks();
  });

  it("should return the mocked year", () => {
    ["1", "2020", "2030"].forEach(async (year) => {
      setMockYear(year);
      expect(await instance.getCurrentYear()).toBe(year);
    });
  });

  it("should throw if invalid timezone requested", () => {
    expect(() => instance.getCurrentYear("I_DONT/EXIST")).rejects.toThrowError(
      TimezoneError
    );
  });

  it("should not throw if no timezone requested", () => {
    setMockYear();
    expect(() => instance.getCurrentYear("America/Caracas")).not.toThrow();
  });

  it("should return years on multiple timezones", async () => {
    const expectedYear = "2020";
    const timezones = ["America/Caracas", "America/Santiago", "Europe/Oslo"];

    setMockYear(expectedYear);
    const responses = await instance.getCurrentYearOnManyTimezones(timezones);
    responses.forEach((res, i) => {
      const [receivedTimezone, receivedYear] = res;
      expect(receivedTimezone).toBe(timezones[i]);
      expect(receivedYear).toBe(expectedYear);
    });
  });
});
