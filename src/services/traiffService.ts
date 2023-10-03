import { AdaptedProivderType, ProivderType, ProviderOption } from "../types";
import AdapterService from "./adapterServices/adapterService";
import { ProviderProxyService } from "./providerServices/providerProxyService";

export class TraiffService {
  async getProvidersOptions(consumption: number): Promise<ProviderOption[]> {
    // Getting available providers
    const providers = await this.getProviders();

    // Adapet providers data
    const adaptedProviders = this.adapetProviders(providers);

    // Calculate based on consumption
    const calculatedCosts = this.calculate(adaptedProviders, consumption);

    // Sort prices ASC
    return calculatedCosts.sort((a, b) => a.annualCost - b.annualCost);
  }

  // what if providers are so many?
  async getProviders(): Promise<ProivderType[]> {
    const providerProxyService = new ProviderProxyService();
    return providerProxyService.load();
  }

  adapetProviders(providers: ProivderType[]): AdaptedProivderType[] {
    const prodiverAdapter = new AdapterService();
    const adaptedProviders: AdaptedProivderType[] = [];

    // Loop through all providers and adapte them based on their types.
    for (const provider of providers) {
      const adapatedProvider = prodiverAdapter.resolve(provider.type, provider);
      adaptedProviders.push({
        name: provider.name,
        resolver: adapatedProvider,
      });
    }

    return adaptedProviders;
  }

  calculate(
    adaptedProviders: AdaptedProivderType[],
    consumption: number
  ): ProviderOption[] {
    const providerOptions: ProviderOption[] = [];
    for (const adaptedProvider of adaptedProviders) {
      if (adaptedProvider.resolver) {
        const annualCost =
          adaptedProvider.resolver.calculateAnnualCost(consumption);
        providerOptions.push({ name: adaptedProvider.name, annualCost });
      }
    }

    return providerOptions;
  }
}
