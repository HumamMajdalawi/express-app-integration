import { mockedProvider } from "../../../mockedData";
import TypeTwoResolver from "./typeTwoResolver";

describe("Type One Resolver", () => {
  it("Should calculate annual cost 3500", () => {
    const resolver = new TypeTwoResolver(mockedProvider[1]);
    const annualCost = resolver.calculateAnnualCost(3500);
    expect(annualCost).toBe(800);
  });

  it("Should calculate annual cost 4000", () => {
    const resolver = new TypeTwoResolver(mockedProvider[1]);
    const annualCost = resolver.calculateAnnualCost(4500);
    expect(annualCost).toBe(950);
  });
});
