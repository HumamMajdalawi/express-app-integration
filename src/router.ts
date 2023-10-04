import { Router } from "express";
import { CostController } from "./controllers/costController";

const router = Router();

router.route("/costs/calculate").post(CostController.getProvidersAnnualCost);

export default router;
