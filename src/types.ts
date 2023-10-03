export type ProivderType = {
  name: string;
  type: number;
  baseCost: number;
  additionalKwhCost: number;
  includedKwh?: number;
};

export type ProviderOption = {
  name: string;
  annualCost: number;
};
