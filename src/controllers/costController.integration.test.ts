import { Request, Response } from "express";
import { CostController } from "./costController";

const mockGetProvidersOptions = jest.fn();

jest.mock("../services/costService", () => ({
  CostService: jest.fn().mockImplementation(() => ({
    getProvidersAnnualCost: mockGetProvidersOptions,
  })),
}));

describe("Cost Controller", () => {
  it("Should return 422 when validate request parameters is undefined", async () => {
    const req = { body: { consumption: undefined } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await CostController.getProvidersAnnualCost(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid consumption value",
    });
  });

  it("Should return 422 when validate request parameters not exists", async () => {
    const req = { body: {} } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await CostController.getProvidersAnnualCost(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid consumption value",
    });
  });

  it("Should return 422 when validate request parameters is string", async () => {
    const req = { body: { consumption: "string" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await CostController.getProvidersAnnualCost(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid consumption value",
    });
  });

  it("Should return 200 when consumption calculated successfully", async () => {
    const req = { body: { consumption: 3500 } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await CostController.getProvidersAnnualCost(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockGetProvidersOptions).toBeCalled();
    expect(res.json).toHaveBeenCalled();
  });
});
