import { Schema, model, Types } from "mongoose";

const tokenSchema = new Schema({
  userId: { type: Types.ObjectId, required: true },
  active: { type: String, default: true },
});

export const TokenModel = model("Token", tokenSchema, "tokens");
