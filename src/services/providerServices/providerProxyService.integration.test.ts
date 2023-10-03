import { ProviderProxyService } from "./providerProxyService";

describe("Provider Proxy Service", () => {
  it("Should call Provider service", async () => {
    const providerProxyService = new ProviderProxyService();
    const res = await providerProxyService.load();
    expect(res.length).toBe(2);
  });
});
