import { TariffService } from "./tariffService";

describe("Tariff Service", () => {
  it("Should return providers annual cost sorted ASC ==> consumption = 3500", async () => {
    const tariffService = new TariffService();
    const options = await tariffService.getProvidersAnnualCost(3500);

    const productOneCost = options[0];
    const productTwoCost = options[1];
    expect(productOneCost.annualCost).toBe(800);
    expect(productTwoCost.annualCost).toBe(830);
  });

  it("Should return providers annual cost sorted ASC ==> consumption = 4500", async () => {
    const tariffService = new TariffService();
    const options = await tariffService.getProvidersAnnualCost(4500);

    const productOneCost = options[0];
    const productTwoCost = options[1];
    expect(productOneCost.annualCost).toBe(950);
    expect(productTwoCost.annualCost).toBe(1050);
  });
});
