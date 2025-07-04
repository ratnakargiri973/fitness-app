import express from 'express';
import { SignUp, SignIn, Logout, getMe, updateUser } from '../controller/userController.js';
import { protectedRoute } from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/sign-up', SignUp);
userRouter.post('/sign-in', SignIn);
userRouter.post('/log-out', Logout);
userRouter.get('/me/:id', getMe);
userRouter.put('/update/:id', upload.single('image'), updateUser);

export default userRouter;