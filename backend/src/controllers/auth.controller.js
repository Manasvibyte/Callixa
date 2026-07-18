import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

//POST- //localhost:5000/api/auth/register
export const register = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//POST- //localhost:5000/api/auth/login
export const login = async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required.",
    });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
