import { Schema, model } from "mongoose";


const messagesSchema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    subject: {type: String, required: true},
    body: {type: String, required: true},
    date: {type: Date, required: true},
    read: {type: Boolean, default: false},
});

export const MessagesModel = model('Message', messagesSchema, 'messages');