import { states, countries } from "./choices";

describe("Choice data file", () => {
  it("there are 51 states (including 'Non-US') to choose from", () => {
    expect(states.length).toEqual(51);
  });

  it("state input exists for non-US investors", () => {
    const stateCodes = states.map((state) => state.abbreviation);
    expect(stateCodes.includes("NOUS")).toBeTruthy();
  });

  // TODO: there are only 195 countries in the world???
  it("there are 249 countries in the world", () => {
    expect(countries.length).toEqual(249);
  });

  it("the United States MUST exist", () => {
    const countryCodes = countries.map((country) => country.code);
    expect(countryCodes.includes("USA")).toBeTruthy();
  });
});
