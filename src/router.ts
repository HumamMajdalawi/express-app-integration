import { Router } from "express";
import PostController from "./controllers/postController";

const router = Router();

router.route("/calculate").post(PostController);

export default router;
