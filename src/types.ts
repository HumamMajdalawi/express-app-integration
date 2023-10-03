import TypeResolver from "./services/adapterServices/resolvers/resolverInterface";

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

export type AdaptedProivderType = {
  name: string;
  resolver: TypeResolver | null;
};
