import { mockedProvider } from "../../mockedData";
import { ProviderType } from "../../types";
import ElectricityProvider from "./providerInterface";

export class ProviderService implements ElectricityProvider {
  async load(): Promise<ProviderType[]> {
    // fetch Data from Third Party API
    // Validate Data here!
    return mockedProvider;
  }
}
