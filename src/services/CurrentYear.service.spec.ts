import { CurrentYearService } from ".";

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
      instance.getCurrentYear("foobar")
    ).rejects.toThrowError();
  });

  xit("should return years on multiple timezones", async () => {
    fetchMock.mockResponse(JSON.stringify("2020"));
    const timezones = ["America/Caracas", "America/Santiago", "Europe/Oslo"];

    const response = await instance.getCurrentYearOnManyTimezones(timezones);
    expect(response[0]).toBe(["America/Caracas", ["2022"]]);
  });
});
