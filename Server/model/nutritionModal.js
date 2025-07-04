import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  foodItems: [
    {
      name: String,
      calories: Number,
      protein: Number,
      carbs: Number,
      fats: Number,
    },
  ],
  totalCalories: Number
}, {timestamps: true});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);
export default Nutrition;
