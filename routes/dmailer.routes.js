import Router from "express";
import {
  getUser,
  login,
  logout,
  signup,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/authJWT.js";

const router = Router();

router.post("/register", signup);

router.get("/me", verifyToken, getUser);

router.post("/login", login);

router.post("/logout", verifyToken, logout);

export default router;
