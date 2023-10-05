import { ProviderResolverType, ProviderType, ProviderOption } from "../types";
import AdapterService from "./adapterServices/adapterService";
import { ProviderProxyService } from "./providerServices/providerProxyService";

export class CostService {
  async getProvidersAnnualCost(consumption: number): Promise<ProviderOption[]> {
    // Getting available providers
    const providers = await this.getProviders();

    // Adapt providers data
    const providerResolvers = this.getProviderResolvers(providers);

    // Calculate annual cost based on consumption
    const providersAnnualCost: ProviderOption[] = [];
    for (const { resolver, name } of providerResolvers) {
      // Check if provider type resolver exists
      if (resolver) {
        // Calculate provider annual cost
        const annualCost = resolver.calculateAnnualCost(consumption);
        // Push new entry to providers annual cost list
        providersAnnualCost.push({ name, annualCost });
      }
    }

    // Sort costs ASC
    return providersAnnualCost.sort((p1, p2) => p1.annualCost - p2.annualCost);
  }

  // what if providers are so many?
  async getProviders(): Promise<ProviderType[]> {
    const providerProxyService = new ProviderProxyService();
    // Request providers from Third party service
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
