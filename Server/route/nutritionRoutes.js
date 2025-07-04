import express from 'express';
import { addNutrition, getNutritionByUser } from '../controller/nutritionController.js';

const nutritionRouter = express.Router();

nutritionRouter.post('/add-nutrition', addNutrition);
nutritionRouter.get('/:userId', getNutritionByUser);

export default nutritionRouter;
