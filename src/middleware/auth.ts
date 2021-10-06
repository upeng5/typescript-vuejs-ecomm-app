import { Request, Response, NextFunction } from "express";
import { getAuth, Auth } from "firebase/auth";
import User from "../models/User";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth: Auth = getAuth();
    const currUser = auth.currentUser;
    if (!currUser) {
      res.status(401).json({
        status: "fail",
        message: "You must sign in to use this feature!",
      });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server error occurred",
    });
    console.log(err);
  }
};

const isAuthAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth: Auth = getAuth();
    const currUser = auth.currentUser;
    if (!currUser) {
      res.status(401).json({
        status: "fail",
        message: "You must sign in to use this feature!",
      });
      return;
    }
    const email: string | any = currUser?.email;
    const user = await User.get({ email: email });

    if (!user) {
      res.status(500).json({
        status: "fail",
        message: "Server error occurred!",
      });
      return;
    }

    if (!user.isAdmin) {
      res.status(403).json({
        status: "fail",
        message: "Unauthorized!",
      });
      return;
    }

    next();
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server error occurred",
    });
    console.log(err);
  }
};

export default { isAuth, isAuthAdmin };
