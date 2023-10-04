import { ProviderType } from "../../types";

export default interface ElectricityProvider {
  load(): Promise<ProviderType[]>;
}
