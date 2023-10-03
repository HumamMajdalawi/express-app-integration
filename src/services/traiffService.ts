import { ProivderType, ProviderOption } from "../types";
import { ProviderProxyService } from "./providerServices/providerProxyService";

export default class TraiffService {
  async getProvidersOptions(consumption: number): Promise<ProviderOption[]> {
    // Getting available providers
    const providers = await this.getProviders();

    return [];
  }

  // what if providers are so many?
  async getProviders(): Promise<ProivderType[]> {
    const providerProxyService = new ProviderProxyService();
    return providerProxyService.load();
  }
}
