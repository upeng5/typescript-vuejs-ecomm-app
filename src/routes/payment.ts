import { Request, Response, Router } from "express";
import paymentController from "../controllers/payment";
import auth from "../middleware/auth";

const router: Router = Router();

// @route   POST api/v1/payment
// @desc    Makes a payment
// @access  Private
router.post("/", auth.isAuth, paymentController.postMakePayment);

export default router;
