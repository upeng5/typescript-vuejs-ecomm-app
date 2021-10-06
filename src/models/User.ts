import * as dynamoose from "dynamoose";
import Product from "./Product";

const Schema = dynamoose.Schema;

const userSchema = new Schema({
  email: String,
  username: String,
  cart: {
    type: Array,
    schema: [Product],
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = dynamoose.model("User", userSchema);

export default User;
