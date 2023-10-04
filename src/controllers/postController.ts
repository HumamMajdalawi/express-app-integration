import { Request, Response } from "express";
import { TariffService } from "../services/tariffService";

const PostController = async (req: Request, res: Response) => {
  try {
    const consumption = req.body.consumption;
    // validate consumption input
    if (!consumption || isNaN(consumption) || consumption < 0) {
      return res.status(422).json({
        success: false,
        message: "Invalid Parameters",
      });
    }

    const tariffService = new TariffService(consumption);
    const options = await tariffService.getProvidersAnnualCost();

    return res.status(200).json({
      success: true,
      message: "success",
      options,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default PostController;
