import { Request, Response } from "express";
import TraiffService from "../services/traiffService";

const PostController = async (req: Request, res: Response) => {
  try {
    const consumption = req.body.consumption;
    // validate consupmtion input

    const traiffService = new TraiffService();
    const options = await traiffService.getProvidersOptions(consumption);

    return res.status(201).json({
      success: true,
      message: "success",
      options,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default PostController;
