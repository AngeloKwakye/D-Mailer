import { UserModel } from "../models/user.model.js";
import { TokenModel } from "../models/token.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res, next) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    };
    await UserModel.create(user);
    res.status(201).json({
      message: "Account created Successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // Find user with email
    const user = await UserModel.findOne({ email: req.body.email });
    // Return 404 Not Found if no user is found
    if (!user) {
      return res.status(404).json({
        message: "User Not found.",
      });
    }
    // Check if user entered correct password
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    // Generate Access Token for User
    const token = jwt.sign({ id: user.id }, process.env.API_SECRET_KEY, {
      expiresIn: 86400,
    });
    // Keep a record of their token
    await TokenModel.create({ userId: user._id });
    // Return response
    res.status(200).json({
      message: "Login successfull",
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Deactivate all user tokens
    await TokenModel.updateMany({ userId: req.user._id }, { active: false });
  } catch (error) {
    next(error);
  }
};
