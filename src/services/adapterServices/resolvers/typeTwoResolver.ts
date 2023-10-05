import Provider from "../../../models/provider";
import { ProviderType } from "../../../types";
import TypeResolver from "./resolverInterface";

export default class TypeTwoResolver implements TypeResolver {
  private provider: Provider;
  constructor(providerData: ProviderType) {
    this.provider = new Provider(providerData);
  }

  calculateAnnualCost(consumption: number): number {
    if (!this.provider.includedKwh || this.provider.includedKwh <= 0) {
      throw new Error("Invalid includedKwh");
    }
    // Checking if consumption exceeded the includedKwh limit
    if (consumption > this.provider.includedKwh!) {
      return this.calcConsumptionCost(consumption);
    }
    // Limit did not exceeded then cost equal the base cost
    return this.provider.baseCost;
  }

  private calcConsumptionCost(consumption: number): number {
    // When consumption exceeds the type limit then
    // Cost = base cost + (consumption after limit * additionalKwhCost)

    const baseCost = this.provider.baseCost;
    const consumptionAfterLimit = consumption - this.provider.includedKwh!;
    const consumptionCostInCents =
      consumptionAfterLimit * this.provider.additionalKwhCost;
    const consumptionCostInEuros = consumptionCostInCents / 100;

    return baseCost + consumptionCostInEuros;
  }
}
