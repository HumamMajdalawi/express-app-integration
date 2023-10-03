import { Request, Response } from "express";
import PostController from "./postController";

const mockGetProvidersOptions = jest.fn();

jest.mock("../services/traiffService", () => ({
  TraiffService: jest.fn().mockImplementation(() => ({
    getProvidersOptions: mockGetProvidersOptions,
  })),
}));

describe("Post Controller", () => {
  it("Should return 422 when validate request parameters", async () => {
    const req = { body: { consumption: undefined } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await PostController(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid Parameters",
    });
  });

  it("Should return 201 when consumpution calculated successfully", async () => {
    const req = { body: { consumption: 3500 } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await PostController(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockGetProvidersOptions).toBeCalled();
    expect(res.json).toHaveBeenCalled();
  });
});
