import * as dynamoose from "dynamoose";

const Schema = dynamoose.Schema;

const productSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 1.0,
  },
  image: String,
});

const Product = dynamoose.model("Product", productSchema);

export default Product;
