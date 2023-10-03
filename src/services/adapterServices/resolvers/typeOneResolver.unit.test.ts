import { mockedProvider } from "../../../mockedData";
import TypeOneResolver from "./typeOneResolver";

describe("Type One Resolver", () => {
  it("Should calculate annual cost 3500", () => {
    const resolver = new TypeOneResolver(mockedProvider[0]);
    const annualCost = resolver.calculateAnnualCost(3500);
    expect(annualCost).toBe(830);
  });

  it("Should calculate annual cost 4000", () => {
    const resolver = new TypeOneResolver(mockedProvider[0]);
    const annualCost = resolver.calculateAnnualCost(4500);
    expect(annualCost).toBe(1050);
  });
});
