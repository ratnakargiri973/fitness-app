import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config';
import { dbConnector  } from './db/index.js';
import userRouter from './route/userRoutes.js';
import authRouter from './route/protectedRoute.js';
import nutritionRouter from './route/nutritionRoutes.js';

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/nutrition', nutritionRouter);

await dbConnector();

app.listen(PORT, ()=>{
    console.log("Server is running at "+ PORT);
})