import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: Number,
}, {timestamps: true});

const Workout = mongoose.model('workout', WorkoutSchema);
 export default Workout;