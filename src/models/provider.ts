import { ProivderType } from "../types";

export default class Provider {
  public name: string;
  public type: number;
  public baseCost: number;
  public additionalKwhCost: number;
  public includedKwh?: number;

  constructor(provider: ProivderType) {
    this.name = provider.name;
    this.type = provider.type;
    this.baseCost = provider.baseCost;
    this.additionalKwhCost = provider.additionalKwhCost;
    this.includedKwh = provider.includedKwh;
  }
}
