import { ProivderType } from "../../types";
import ElectricityProvider from "./providerInterface";
import { ProviderService } from "./providerService";

export class ProviderProxyService implements ElectricityProvider {
  private providerService: ProviderService;

  constructor() {
    this.providerService = new ProviderService();
  }
  async load(): Promise<ProivderType[]> {
    return this.providerService.load();
  }
}
