import { Request, Response } from "express";

const PostController = async (req: Request, res: Response) => {
  try {
    // passing param to the service
    return res.status(201).json({
      success: true,
      message: "",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default PostController;
