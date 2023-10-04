import { mockedProvider } from "../../mockedData";
import AdapterService from "./adapterService";
import TypeOneResolver from "./resolvers/typeOneResolver";
import TypeTwoResolver from "./resolvers/typeTwoResolver";

describe("Adapter Service", () => {
  it("Should return TypeOneResolver", () => {
    const adapterService = new AdapterService();
    const input = mockedProvider[0];
    const resolver = adapterService.getResolver(input.type, mockedProvider[0]);
    expect(resolver).toBeInstanceOf(TypeOneResolver);
  });
  it("Should return TypeTwoResolver", () => {
    const adapterService = new AdapterService();
    const input = mockedProvider[1];
    const resolver = adapterService.getResolver(input.type, mockedProvider[0]);
    expect(resolver).toBeInstanceOf(TypeTwoResolver);
  });
});
