import express, { Application } from "express";
import cors from "cors";
import configureDB from "./config/database";
import dotenv from "dotenv";
import morgan from "morgan";
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const app: Application = express();
const port: string | number = process.env.PORT || 5000;

// ROUTES
import userRoutes from "./routes/user";
import productRoutes from "./routes/product";
import paymentRoutes from "./routes/payment";

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/payment", paymentRoutes);

// Configure database
configureDB();

// Start the server
app.listen(port, (): void => {
  console.log(`Listening on port: ${port}.`);
});
