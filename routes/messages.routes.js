import { Router } from "express";
import { addMessages, getMessages } from "../controllers/message.controller.js";

const router = Router();


router.get('/', getMessages);

router.post('/', addMessages);


export default router;