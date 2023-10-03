import { Request, Response } from "express";
import { TraiffService } from "../services/traiffService";

const PostController = async (req: Request, res: Response) => {
  try {
    const consumption = req.body.consumption;
    // validate consupmtion input
    if (!consumption || consumption < 0) {
      return res.status(422).json({
        success: false,
        message: "Invalid Parameters",
      });
    }

    const traiffService = new TraiffService();
    const options = await traiffService.getProvidersOptions(consumption);

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
