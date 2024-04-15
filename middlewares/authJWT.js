import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/user.model.js";
import { TokenModel } from "../models/token.model.js";

dotenv.config();

const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1]
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET_KEY,
      async function (err, decoded) {
        if (err) {
          return res.status(401).json({
            message: err.message,
          });
        }
        // Check if Token exists for user
        const tokenExist = await TokenModel.exists({
          userId: decoded.id,
          active: true,
        });
        if (!tokenExist) {
          return res.status(403).json({
            message: "Token record does not exist!",
          });
        }
        // Find user with id
        const user = await UserModel.findById(decoded.id);
        // Check if user exist
        if (!user) {
          return res.status(403).json({
            message: "User record does not exist!",
          });
        }
        // Add user to request
        req.user = {
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
        };
        // Forward request to next
        next();
      }
    );
  } else {
    return res.status(401).json({
      message: "Bearer token not found in request headers!",
    });
  }
};

export default verifyToken;
