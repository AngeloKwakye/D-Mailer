import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true, unique: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
});

export const UserModel = model('User', userSchema, 'users');