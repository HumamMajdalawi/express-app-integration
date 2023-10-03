import { ProivderType } from "../../types";

export default interface ElectricityProvider {
  load(): Promise<ProivderType[]>;
}
