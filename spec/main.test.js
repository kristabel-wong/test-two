const analysis = require("../analysis");

const expectedMostVisitedUrls = [
  ["/faq/", 2],
  ["/docs/manage-websites/", 2],
  ["/intranet-analytics/", 1],
];

const expectedMostActiveIPs = [
  ["168.41.191.40", 4],
  ["177.71.128.21", 3],
  ["50.112.00.11", 3],
];

describe("Analysis of log file", () => {
  beforeAll(() => {
    return analysis.loadFile("programming-task-example-data.log");
  });

  test("The data should return the correct number of unique IP addresses", () => {
    expect(analysis.getUniqueIPs()).toBe(11);
  });

  test("The data should return the correct top 3 most visited URLs", () => {
    expect(analysis.getMostVisitedURLs(3)).toEqual(expectedMostVisitedUrls);
  });

  test("The data should return the correct top 3 most active IPs", () => {
    expect(analysis.getTopIPs(3)).toEqual(expectedMostActiveIPs);
  });
});
