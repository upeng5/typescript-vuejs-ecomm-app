import { String } from "aws-sdk/clients/cloudtrail";
import { Request, Response } from "express";
import { v4 as uuid4 } from "uuid";

import Product from "../models/Product";

const IMAGE_DEFAULT_PATH: string =
  "https://ts-ecom-app-bucket.s3.us-west-2.amazonaws.com/images/default.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRjBEAiAWRyThfHKdkTnQFwmrDO3iOXrpxa2yPCAl%2BdpV22vYBgIgK%2F9sPl%2FDC8XaUIYIEDnR8sSW15ogDEJTkPmUlCpqsI4qjQMIGBAAGgwwNzIxMzQ0OTcwMDMiDPeG3HtKmYVzKvFxairqArk%2FtknCI2e6jN51PewjjuYYqs4uCp4ttiUQlmQ5z3YCJzIXiHfzAkYJ3uujfh7FxJGgZPbfJRZavcTAu%2F1cJlqbddvajhzUB6%2BuR4pqeP%2Bx9aDm96p4dpcmJ5Ef%2FlzZU2Emeepb8lEkYhLB59vO%2F120HgZlJSvwXng0HTZy5qf48j%2FEP96NINd%2FqVuyhd3yP%2BEbOoYZYgEtCdtIuCpb6CtWFYc0YugYLTgjEtgJ7ETJyqdF0aNKIuqaL0NjO3HvTNwjmV1Ew182pGblFWVDYkTTkbh8bfiVp2CYWVXB5PSXbWJ%2Fwlbut2YH%2Fe5IhE46IJwh3cxhKdQJ8l47yFuc38r0%2BULtw3lsurE2f0iQVfdnQwFoR%2FJkW%2BkQYrhMy%2FIjPOsLcgOxEb8nu50Ehvl0CEGxhU5pG%2Fh69QUcOLEBv2X1Q2Q4S5aOPgD%2FIJSjGF92%2BSXRkePkUAWu64n54yo3TOG2TbXzUKXyW6BUMLGC4YoGOrQC%2BP1DGgAEHpyNwGSp8zBtTGB0P%2BUDAY0q7UgJaFNAyhcfKpK916ixOr0kxcg1H%2F1HPJ48UWtijEVQytZugKLK19reuQKAQRb9XM7tMV5DWo0XztN8FSjOf2dRAnZ0JKtFP2cYH0k7bfhCu23C3jWtuYJsX0Kw7ky%2FFwy9pVvjjpcrj4fVK2Edx2IjO160Nc5zYQccm38QVZekZScZRRGlFjNYuASewCqkUE9nJ6qJo4r2xuebRFFnSR2nbVm8hJk29x5h0NEmuXuNEaUaZigvzooFCBkE249a76zI%2Bj6uHu1Qn0H8aszj07yc2UaJMEixTdNuWsGQ344lGjhgJCdqJTdOqJhBWbEOxu5LIlynmb3c6Hp3jOMrtK4XIIjyHnnOAXl2wIbIok9y8exbf1kNaaaL83s%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20211002T164819Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIARBS4NCLVU3CYS3UO%2F20211002%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=0eae212451415bf6001fdbfd9c81f3411ecea565650cd046eba258bbfb00786f";

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
