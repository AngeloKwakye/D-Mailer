import { MessagesModel } from "../models/message.model.js";



export const addMessages = async (req,res,next) => {
   try {
     const messageResult = await MessagesModel.create(req.body);
     res.status(201).json(messageResult);
   } catch (error) {
    next(error);
   }
}



export const getMessages = async (req, res, next) =>{
   try {
     const messages = await MessagesModel.find({});
     res.json(messages);
   } catch (error) {
    next(error);
   }
}