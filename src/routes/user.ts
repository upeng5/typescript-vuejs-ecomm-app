import { Request, Response, Router } from "express";
import userController from "../controllers/user";
import auth from "../middleware/auth";

const router: Router = Router();

// @route   POST api/v1/users
// @desc    Register a user
// @access  Public
router.post("/", userController.postSignUpUser);

// @route   POST api/v1/users/signin
// @desc    Sign in a user
// @access  Public
router.post("/signin", userController.postSignInUser);

// @route   POST api/v1/users/logout
// @desc    Logout a user
// @access  Private
router.get("/logout", userController.logoutUser);

// @route   POST api/v1/users/cart
// @desc    Add a product to the user's cart
// @access  Private
router.post("/cart/:id", auth.isAuth, userController.postAddProductToCart);

// @route   POST api/v1/users/cart/:username/:id
// @desc    Delete a product from cart
// @access  Private
router.post(
  "/cart/user/product/:id",
  auth.isAuth,
  userController.postDeleteProductFromCart
);

// @route   POST api/v1/users/cart
// @desc    Get cart items
// @access  Private
router.post("/cart", auth.isAuth, userController.getCartItems);

export default router;
