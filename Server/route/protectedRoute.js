import express from 'express';
import { protectedRoute } from '../middlewares/auth.js';

const authRouter = express.Router();

authRouter.get('/valid-token', protectedRoute, (req, res) => {
    res.status(200).send({user: req.User});
})

export default authRouter;