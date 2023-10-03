import { ProviderProxyService } from "./providerProxyService";

const mockLoad = jest.fn();

jest.mock("./providerService", () => ({
  ProviderService: jest.fn().mockImplementation(() => ({
    load: mockLoad,
  })),
}));

describe("Provider Proxy Service", () => {
  it("Should call Provider service", async () => {
    const providerProxyService = new ProviderProxyService();
    await providerProxyService.load();
    expect(mockLoad).toBeCalled();
  });
});
