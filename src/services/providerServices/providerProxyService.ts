import { ProviderType } from "../../types";
import ElectricityProvider from "./providerInterface";
import { ProviderService } from "./providerService";

export class ProviderProxyService implements ElectricityProvider {
  private providerService: ProviderService;

  constructor() {
    this.providerService = new ProviderService();
  }
  async load(): Promise<ProviderType[]> {
    try {
      return this.providerService.load();
    } catch (error) {
      console.error(error);
      throw new Error("Unable to load providers");
    }
  }
}
