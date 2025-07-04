import User from "../model/userModal.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { uploadToCloudinary } from "../utils/cloudinary.js";

export async function SignUp(req, res) {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(409).json({ message: 'Phone number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('SignUp error:', error);
    res.status(500).json({ message: 'Server error during signup', error: error.message });
  }
}


export async function SignIn(req, res) {
  const { emailOrPhone, password } = req.body;

  try {
    const userToLogin = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!userToLogin) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const passwordMatched = await bcrypt.compare(password, userToLogin.password);

    if (!passwordMatched) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign(
      {
        userId: userToLogin._id,
        useremail: userToLogin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    );

    const loggedInUser = {
      _id: userToLogin._id,
      name: userToLogin.name,
      email: userToLogin.email,
      phone: userToLogin.phone,
      profilePic: userToLogin.profilePic,
      age: userToLogin.age,
      gender: userToLogin.gender,
      height: userToLogin.height,
      weight: userToLogin.weight,
      activityLevel: userToLogin.activityLevel,
      fitnessGoals: userToLogin.fitnessGoals,
      stepsToday: userToLogin.stepsToday,
      workouts: userToLogin.workouts,
      token: token,
    };

    res.status(200).json({
      message: `Welcome to fitness tracker app, ${userToLogin.name}. You are logged in successfully.`,
      user: loggedInUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in logging in.", error: error.message });
  }
}


export async function Logout(req, res){
  try {
    res.clearCookie("token",
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });
    res.status(200).send({ message: "You are logged out successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error in logging out user", error });
  }
}

export async function getMe(req, res){
    const {id} = req.params;
    try {
        const singleUser = await user.findById(id);

        if(!singleUser){
            return res.status(404).send({message: "User not found"});
        }

        res.status(200).send({message: "success", singleUser});
    } catch (error) {
        res.status(500).send({message: "error in getting single user", error});
    }
}


export const updateUser = async (req, res) => {
  const { name, email, phone, age, gender, height, weight, fitnessGoals, profilePic } = req.body;

  try {
    let profilePicUrl = profilePic || ""; 

    if (req.file) {
      const uploadedImg = await uploadToCloudinary(req.file.buffer);
      profilePicUrl = uploadedImg.secure_url;
    }

    const updateFields = {
      name,
      email,
      phone,
      profilePic: profilePicUrl, // now uses correct final value
      age,
      gender,
      height,
      weight,
      fitnessGoals,
    };

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
    });

    res.status(200).send({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).send({ message: 'Error in updating user', error });
  }
};

