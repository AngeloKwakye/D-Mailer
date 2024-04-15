import { UserModel } from "../models/user.model.js";
import { TokenModel } from "../models/token.model.js";

export const addUser = async (req, res, next) => {
  try {
    const userResult = await UserModel.create(req.body);
    if(userResult){
        const userToken = await TokenModel.create({
            userId: userResult._id,
            active: true
        })
        console.log({userToken})
    }
    res.status(201).json(userResult);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: `user with Id ${res.params.id} not found!`,
      });
    }
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const loginRes = await UserModel.find(req.body);
    res.json(loginRes);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next)=>{
    console.log('logout');
}
