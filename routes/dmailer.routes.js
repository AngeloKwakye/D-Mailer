import Router from "express";
import {
  getUser,
  login,
  logout,
  signup,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/authJWT.js";
import {validateSignUp, validatelogin} from "../middlewares/authValidator.js";

const router = Router();

router.post("/signup", validateSignUp, signup);

router.get("/me", verifyToken, getUser);

router.post("/login", validatelogin, login);

router.post("/logout", verifyToken, logout);

export default router;
