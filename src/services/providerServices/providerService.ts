import { mockedProvider } from "../../mockedData";
import { ProivderType } from "../../types";
import ElectricityProvider from "./providerInterface";

export default class ProviderService implements ElectricityProvider {
  async load(): Promise<ProivderType[]> {
    // fetch Data from Third Party API
    // Validate Data here!
    return mockedProvider;
  }
}
