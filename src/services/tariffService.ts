import { ProviderResolverType, ProviderType, ProviderOption } from "../types";
import AdapterService from "./adapterServices/adapterService";
import { ProviderProxyService } from "./providerServices/providerProxyService";

export class TariffService {
  async getProvidersAnnualCost(consumption: number): Promise<ProviderOption[]> {
    // Getting available providers
    const providers = await this.getProviders();

    // Adapt providers data
    const providerResolvers = this.getProviderResolvers(providers);

    // Calculate based on consumption
    const providersAnnualCost: ProviderOption[] = [];
    for (const provider of providerResolvers) {
      // Check if provider type resolver exists
      if (provider.resolver) {
        // Calculate provider annual cost
        const annualCost = provider.resolver.calculateAnnualCost(consumption);
        // Push new entry to providers annual cost list
        providersAnnualCost.push({ name: provider.name, annualCost });
      }
    }

    // Sort costs ASC
    return providersAnnualCost.sort((p1, p2) => p1.annualCost - p2.annualCost);
  }

  // what if providers are so many?
  async getProviders(): Promise<ProviderType[]> {
    const providerProxyService = new ProviderProxyService();
    return providerProxyService.load();
  }

  getProviderResolvers(providers: ProviderType[]): ProviderResolverType[] {
    const providerAdapter = new AdapterService();
    const providerResolvers: ProviderResolverType[] = [];

    // Loop through all providers and adapt them based on their types.
    for (const provider of providers) {
      const providerResolver = providerAdapter.getResolver(
        provider.type,
        provider
      );
      providerResolvers.push({
        name: provider.name,
        resolver: providerResolver,
      });
    }

    return providerResolvers;
  }
}
