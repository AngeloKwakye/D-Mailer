import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true, unique: String},
    email: {type: String, unique: String, required: true},
    password: {type: String, required: true},
});

export const UserModel = model('User', userSchema, 'users');