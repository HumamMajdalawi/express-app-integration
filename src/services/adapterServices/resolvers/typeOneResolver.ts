import Provider from "../../../models/provider";
import { ProviderType } from "../../../types";
import TypeResolver from "./resolverInterface";

export default class TypeOneResolver implements TypeResolver {
  private provider: Provider;
  constructor(providerData: ProviderType) {
    this.provider = new Provider(providerData);
  }

  calculateAnnualCost(consumption: number): number {
    const baseAnnualCost = this.calcAnnualBaseCost();
    const consumptionCost = this.calcConsumptionCost(consumption);

    return baseAnnualCost + consumptionCost;
  }

  private calcAnnualBaseCost(): number {
    return this.provider.baseCost * 12;
  }

  private calcConsumptionCost(consumption: number): number {
    // costInCents = (consumption (KWH/YEAR) * additionalKwhCost(CENT))
    // costInEuros = costInCents / 100

    return (consumption * this.provider.additionalKwhCost) / 100;
  }
}
