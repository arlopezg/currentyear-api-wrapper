import fetchMock from "jest-fetch-mock";

import { CurrentYearService } from ".";
import { TimezoneError } from "../exceptions";

describe("CurrentYearService", () => {
  const mockYears = ["1", "2020", "2030"];
  let instance: CurrentYearService;

  beforeEach(() => {
    instance = new CurrentYearService();
    fetchMock.resetMocks();
  });

  it("should return the received value", () => {
    mockYears.forEach(async (year) => {
      fetchMock.mockResponseOnce(JSON.stringify(year));
      expect(await instance.getCurrentYear()).toBe(year);
    });
  });

  it("should throw if invalid timezone requested", async () => {
    await expect(async () =>
      instance.getCurrentYear("I_DONT/EXIST")
    ).rejects.toThrowError(TimezoneError);
  });

  it("should return years on multiple timezones", async () => {
    const expectedYear = "2020";
    const timezones = ["America/Caracas", "America/Santiago", "Europe/Oslo"];
    fetchMock.mockResponse(JSON.stringify(expectedYear));

    const responses = await instance.getCurrentYearOnManyTimezones(timezones);
    responses.forEach((res, i) => {
      const [receivedTimezone, receivedYear] = res;
      expect(receivedTimezone).toBe(timezones[i]);
      expect(receivedYear).toBe(expectedYear);
    });
  });
});
