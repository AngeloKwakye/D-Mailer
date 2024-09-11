import { UserModel } from "../models/user.model.js";
import { TokenModel } from "../models/token.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
// import { validateSignUp } from '../middlewares/validator.js'

dotenv.config();

export const signup = async (req, res, next) => {

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array()
    });
  };
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
    res.json({
      status: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array()
    });
  };
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
        status: false,
        accessToken: null,
        message: "Invalid username or password!",
      });
    }
    // Generate Access Token for User
    const token = jwt.sign({ id: user._id }, process.env.API_SECRET_KEY, {
      expiresIn: 86400,
    });
    // Keep a record of their token
    await TokenModel.create({ userId: user._id });
    // Return response
    res.status(200).json({
      status: true,
      message: "Login successful!",
      accessToken: token,
      user: user
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Deactivate all user tokens
    await TokenModel.updateMany({ userId: req.user._id }, { active: false });
    res.status(200).json({
      status: true,
      message: "User logged out successfully!"
    });
  } catch (error) {
    next(error);
  }
};
