import { calculatePersonalLimit } from "./finance";

describe("testing finance functions", () => {
  describe("calculating spend limits", () => {
    it("expects function to return correct limit", () => {
      expect(calculatePersonalLimit(0, 0)).toEqual(2200);
      expect(calculatePersonalLimit(200000, 1000000)).toEqual(20000);
      expect(calculatePersonalLimit(9999999, 10000000)).toEqual(107000);
    });
  });
});
