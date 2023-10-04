import { AdaptedProviderType, ProviderType, ProviderOption } from "../types";
import AdapterService from "./adapterServices/adapterService";
import { ProviderProxyService } from "./providerServices/providerProxyService";

export class TariffService {
  constructor(private consumption: number) {}

  async getProvidersAnnualCost(): Promise<ProviderOption[]> {
    // Getting available providers
    const providers = await this.getProviders();

    // Adapt providers data
    const adaptedProviders = this.adaptProviders(providers);

    // Calculate based on consumption

    const providersAnnualCost: ProviderOption[] = [];
    for (const provider of adaptedProviders) {
      if (provider.resolver) {
        const annualCost = this.calculateProviderAnnualCost(provider);
        providersAnnualCost.push({ name: provider.name, annualCost });
      }
    }

    // Sort prices ASC
    return providersAnnualCost.sort((a, b) => a.annualCost - b.annualCost);
  }

  // what if providers are so many?
  async getProviders(): Promise<ProviderType[]> {
    const providerProxyService = new ProviderProxyService();
    return providerProxyService.load();
  }

  adaptProviders(providers: ProviderType[]): AdaptedProviderType[] {
    const providerAdapter = new AdapterService();
    const adaptedProviders: AdaptedProviderType[] = [];

    // Loop through all providers and adapt them based on their types.
    for (const provider of providers) {
      const adaptedProvider = providerAdapter.resolve(provider.type, provider);
      adaptedProviders.push({
        name: provider.name,
        resolver: adaptedProvider,
      });
    }

    return adaptedProviders;
  }

  calculateProviderAnnualCost(provider: AdaptedProviderType): number {
    return provider.resolver!.calculateAnnualCost(this.consumption);
  }
}
