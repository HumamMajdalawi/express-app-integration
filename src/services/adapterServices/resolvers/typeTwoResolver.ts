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

    if (consumption > this.provider.includedKwh!) {
      return this.calcConsumptionCost(consumption);
    }
    return this.provider.baseCost;
  }

  private calcConsumptionCost(consumption: number): number {
    const baseCost = this.provider.baseCost;
    const consumptionAfterLimit = consumption - this.provider.includedKwh!;
    const consumptionCostInCents =
      consumptionAfterLimit * this.provider.additionalKwhCost;
    const consumptionCostInEuros = consumptionCostInCents / 100;

    return baseCost + consumptionCostInEuros;
  }
}
