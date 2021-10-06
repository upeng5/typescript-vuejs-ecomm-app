import { Request, Response } from "express";
import Stripe from "stripe";
import calculateTotal from "../utils/calculateTotal";

const publicKey: string | any = process.env.STRIPE_PUP_KEY;
const stripe = new Stripe(publicKey, {
  apiVersion: "2020-08-27",
});

// @route   POST api/v1/payment
// @desc    Creates a payment request
// @access  Private
const postMakePayment = async (res: Response, req: Request) => {
  if (!publicKey) {
    res.status(500).json({ status: "fail", message: "Error making payment" });
    return;
  }
  const cart = req.body.cart;
  const paymentMethod: string = req.body.paymentMethod;

  let total: number = calculateTotal(cart);
  try {
    const params: Stripe.PaymentIntentCreateParams = {
      amount: total,
      currency: "usd",
      payment_method_types: [paymentMethod],
    };
    const paymentIntent: Stripe.PaymentIntent =
      await stripe.paymentIntents.create(params);
    res
      .status(200)
      .json({ status: "success", clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ status: "fail", message: "Error making payment" });
    console.log(err);
  }
};

export default { postMakePayment };
