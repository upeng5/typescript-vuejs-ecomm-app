import { Request, Response } from "express";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  UserCredential,
} from "firebase/auth";
import firebaseApp from "../config/firebase";

import User from "../models/User";
import Product from "../models/Product";
import { FirebaseError } from "@firebase/util";
import { AnyDocument } from "dynamoose/dist/Document";

// @route   POST api/v1/users
// @desc    Register a user
// @access  Public
const postSignUpUser = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;

    const auth: Auth = getAuth(firebaseApp);
    await createUserWithEmailAndPassword(auth, email, password);

    const newUser = new User({
      username,
      email,
    });

    await newUser.save();
    res
      .status(201)
      .json({ status: "success", email: email, username: username });
  } catch (err: FirebaseError | any) {
    if (err.code === "auth/email-already-in-use") {
      return res
        .status(403)
        .json({ status: "fail", message: "Email already in use!" });
    }
    res.status(500).json({ status: "fail", message: "Server error occurred" });
    console.log(err);
  }
};

// @route   POST api/v1/users
// @desc    Sign in a user
// @access  Public
const postSignInUser = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const auth: Auth = getAuth(firebaseApp);
    const credentials: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userEmail: string | null = credentials.user.email;
    if (!userEmail) {
      res.status(403).json({ status: "fail", message: "An error occurred" });
      signOut(auth);
      return;
    }

    const user = await User.get({ email: userEmail });

    res.status(200).json({
      status: "success",
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err: FirebaseError | any) {
    if (
      err.code === "auth/wrong-password" ||
      err.code === "auth/invalid-email"
    ) {
      return res
        .status(403)
        .json({ status: "fail", message: "Invalid credentials!" });
    } else if (err.code === "auth/user-not-found") {
      return res
        .status(403)
        .json({ status: "fail", message: "No such user exists!" });
    }
    res.status(500).json({ status: "fail", message: "Server error occurred" });
    console.log(err);
  }
};

// @route   POST api/v1/users
// @desc    Logout a user
// @access  Private
const logoutUser = async (req: Request, res: Response) => {
  try {
    const auth: Auth = getAuth(firebaseApp);
    await signOut(auth);
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully!" });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Server error occurred" });
    console.log(err);
  }
};

// @route   POST api/v1/users/cart
// @desc    Add a product to the user's cart
// @access  Private
const postAddProductToCart = async (req: Request, res: Response) => {
  try {
    const prodId = req.params.id;
    const email = req.body.email;
    const user = await User.get({ email: email });
    const result = await Product.query({ id: prodId }).exec();
    const product: AnyDocument = result[0];

    // Check if a product is already in the cart
    user.cart.forEach((item: any) => {
      console.log(item);
      if (product.id === item) {
        return res
          .status(400)
          .json({ status: "fail", message: "Item already exists in cart!" });
      }
    });

    user.cart.push(product);
    await user.save();
    res.status(201).json({ status: "success", product: product });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Server error occurred" });
    console.log(err);
  }
};

// @route   DELETE api/v1/users/cart/:id
// @desc    Delete a product from cart
// @access  Private
const postDeleteProductFromCart = async (req: Request, res: Response) => {
  try {
    const prodId: string = req.params.id;
    const email: string = req.body.email;
    console.log("EMAIL:", email);
    const user: AnyDocument = await User.get({ email: email });
    if (!user) {
      return res
        .status(500)
        .json({ status: "fail", message: "Server error occurred" });
    }
    const prods: [] | any = user.cart;
    user.cart = prods.filter((prod: string | any) => {
      return prod !== prodId;
    });
    await user.save();
    res.status(201).json({ status: "success", cart: user.cart });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Server error occurred" });
    console.log(err);
  }
};

// @route   POST api/v1/users/cart
// @desc    Get the user's cart items
// @access  Private
const getCartItems = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const user: AnyDocument = await User.get(email);
    if (!user) {
      res
        .status(500)
        .json({ status: "fail", message: "Server error occurred" });
    }
    const cart: [any] = user.cart;
    let filledCart: AnyDocument[] = [];

    // TODO: Optimize
    for (var i = 0; i < cart.length; i++) {
      let prodId = cart[i];
      const prod = await Product.get(prodId);
      filledCart.push(prod);
    }

    res.status(201).json({ status: "success", cart: filledCart });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Server error occurred" });
    console.log(err);
  }
};

export default {
  postSignUpUser,
  postSignInUser,
  logoutUser,
  postAddProductToCart,
  postDeleteProductFromCart,
  getCartItems,
};
