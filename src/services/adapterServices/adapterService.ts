import { ProviderType } from "../../types";
import TypeOneResolver from "./resolvers/typeOneResolver";
import TypeTwoResolver from "./resolvers/typeTwoResolver";

export default class AdapterService {
  getResolver(providerType: number, provider: ProviderType) {
    switch (providerType) {
      case 1:
        return new TypeOneResolver(provider);
      case 2:
        return new TypeTwoResolver(provider);
      default:
        return null;
    }
  }
}
