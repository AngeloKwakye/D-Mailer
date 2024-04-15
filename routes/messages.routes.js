import { Router } from "express";
import { addMessages, getMessages } from "../controllers/message.controller.js";
import verifyToken from "../middlewares/authJWT.js";

const router = Router();

router.get("/", verifyToken, getMessages);

router.post("/", verifyToken, addMessages);

export default router;
