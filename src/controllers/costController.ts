import { Request, Response } from "express";
import { CostService } from "../services/costService";

export class CostController {
  static async getProvidersAnnualCost(req: Request, res: Response) {
    try {
      const consumption = req.body.consumption;
      // validate consumption input
      if (!consumption || isNaN(consumption) || consumption < 0) {
        return res.status(422).json({
          success: false,
          message: "Invalid consumption value",
        });
      }

      const costService = new CostService();
      // Get providers annual cost based on entered consumption
      const providersAnnualCost = await costService.getProvidersAnnualCost(
        consumption
      );

      return res.status(200).json({
        success: true,
        message: "success",
        providersAnnualCost,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
}
