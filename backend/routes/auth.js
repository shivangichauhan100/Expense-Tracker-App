// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js'; // Correct import

const router = express.Router();

// User signup route
router.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    console.log("Received data: ", req.body);  // Log the incoming data
  
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
    }

    try {
        const newUser = new User({
            username,
            email,
            password
        });

        const savedUser = await newUser.save();
        console.log("Saved user: ", savedUser); // Log the saved user

        res.status(201).json({ message: "User registered successfully", user: savedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// User login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Received data: ", req.body); 

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default router;
