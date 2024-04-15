import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/dmailer.routes.js'
import messagesRouter from './routes/messages.routes.js'
import mongoose from 'mongoose';


dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/messages', messagesRouter)


await mongoose.connect(process.env.MONGO_URI)

app.listen(PORT, ()=>{
    console.log(`D'Mailer is live! ${PORT}`)
})