import bcrypt from "bcryptjs";

import User from "../models/User.js";

import generateToken from "../utils/generateToken.js";

import asyncHandler from "../utils/asyncHandler.js";

// ================= REGISTER =================
export const registerUser =
  asyncHandler(async (req, res) => {

    const {
      name,
      email,
      password,
    } = req.body;

    // Existing user
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(409).json({
        success: false,
        msg: "User already exists",
      });

    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );

    // Create user
    const user =
      await User.create({
        name,
        email,
        password: hashedPassword,
      });

    // Generate token
    const token =
      generateToken(user._id);

    res.status(201).json({
      success: true,
      msg:
        "User registered successfully",

      token,

    user: {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
},
    });

  });

// ================= LOGIN =================
export const loginUser =
  asyncHandler(async (req, res) => {

    const {
      email,
      password,
    } = req.body;

    // Find user
    const user =
      await User.findOne({
        email,
      });

    // Invalid email
    if (!user) {

      return res.status(401).json({
        success: false,
        msg: "Invalid credentials",
      });

    }

    // Compare password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    // Invalid password
    if (!isMatch) {

      return res.status(401).json({
        success: false,
        msg: "Invalid credentials",
      });

    }

    // Generate token
    const token =
      generateToken(user._id);

    res.status(200).json({
      success: true,
      msg: "Login successful",

      token,

 user: {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
},
    });

  });

// ================= GET CURRENT USER =================
export const getMe =
  asyncHandler(async (req, res) => {

    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    // User not found
    if (!user) {

      return res.status(404).json({
        success: false,
        msg: "User not found",
      });

    }

    res.status(200).json({
      success: true,
      user,
    });

  });