import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Enter complete credentials" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ msg: "User created", data: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Enter complete credentials" });
    }
    const userLog = await User.findOne({ email });

    if (!userLog) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userLog.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: userLog._id, email: userLog.email },
      process.env.JWT,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: userLog._id,
        username: userLog.name,
        email: userLog.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUser = async (req,res) => {
  try {
    const user = await User.find({});
    res.status(200).json({data : user})
  } catch (error) {
    console.log(error)    
  }
}
