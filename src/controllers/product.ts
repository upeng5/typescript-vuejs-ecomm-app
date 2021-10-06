import { String } from "aws-sdk/clients/cloudtrail";
import { Request, Response } from "express";
import { v4 as uuid4 } from "uuid";

import Product from "../models/Product";

const IMAGE_DEFAULT_PATH: string =
  "{S3_DEFAULT_IMAGE_PATH}";

// @route   GET api/v1/products/ping
// @desc    Gets all the products
// @access  Public
const ping = (req: Request, res: Response): void => {
  res.json({ status: "success", message: "Hello World!" });
};

// @route   GET api/v1/products
// @desc    Get all products
// @access  Public
const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.scan().exec();

    if (products.length < 1) {
      res.status(403).json({
        status: "fail",
        message: "There are no products at the moment!",
      });
      return;
    }

    res.status(200).json({ status: "success", products: products });
  } catch (err) {
    res.status(500).json({ status: "fail", error: "An error occurred" });
    console.log(err);
  }
};

// @route   POST api/v1/products
// @desc    Creates a product
// @access  Private
const postProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = uuid4();
    const title: string = req.body.title;
    const brand: string = req.body.brand;
    const description: string = req.body.description;
    let price: number = parseFloat(req.body.price);
    let rating: number = parseInt(req.body.rating);
    let image: string | any = (req as any).file.location;

    if (!image) {
      image = IMAGE_DEFAULT_PATH;
    }

    const newProduct = new Product({
      id: id,
      title: title,
      brand: brand,
      description: description,
      price: price,
      rating: rating,
      image: image,
    });

    await newProduct.save();
    res.status(201).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "fail", error: "An error occurred" });
    console.log(err);
  }
};

export default { getProducts, postProduct, ping };
