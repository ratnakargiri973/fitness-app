// Server/controller/nutritionController.js
import Nutrition from "../model/nutritionModal.js";

// Add a new nutrition entry
export const addNutrition = async (req, res) => {
  const { userId, mealType, foodItems } = req.body;

  if (!userId || !mealType || !foodItems || !Array.isArray(foodItems)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Calculate total calories from all food items
    const totalCalories = foodItems.reduce((sum, item) => sum + (item.calories || 0), 0);

    const nutrition = new Nutrition({
      userId,
      mealType,
      foodItems,
      totalCalories,
    });
    await nutrition.save();

    res.status(201).json({ message: "Nutrition entry added", nutrition });
  } catch (error) {
    res.status(500).json({ message: "Failed to add nutrition", error });
  }
};

// Get nutrition entries by user
export const getNutritionByUser = async (req, res) => {
  try {
    const data = await Nutrition.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nutrition data", error });
  }
};
