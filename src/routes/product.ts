import { Request, Response, Router } from "express";
import productController from "../controllers/product";
import auth from "../middleware/auth";
import upload from "../middleware/upload";

const router: Router = Router();

// @route   GET api/v1/products/ping
// @desc    Tests the api
// @access  Public
router.get("/ping", productController.ping);

// @route   GET api/v1/products
// @desc    Gets all the products
// @access  Public
router.get("/", productController.getProducts);

// @route   POST api/v1/products/ping
// @desc    Creates a product
// @access  Private
router.post(
  "/",
  upload.single("image"),
  auth.isAuthAdmin,
  productController.postProduct
);

export default router;
