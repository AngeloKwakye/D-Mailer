import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
    userId: {type: String, required: true},
    active: {type: String, required: true} 
});

export const TokenModel = model('Token', tokenSchema, 'tokens');