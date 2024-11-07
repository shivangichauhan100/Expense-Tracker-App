import User from "../models/userSchema.js";
import Transaction from '../models/transactionSchema.js';
import Category from "../models/categorySchema.js";

// Example function to create a new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Example function to create a new transaction
export const sendExpense = async (req, res) => {
  console.log("Incoming request body:", req.body); // Add this line
  const { userId, text, amount } = req.body;

  if (!userId || !text || !amount) {
      return res.status(400).json({ error: "All fields (userId, text, amount) are required." });
  }

  try {
      const newTransaction = new Transaction({ userId, text, amount });
      const savedTransaction = await newTransaction.save();
      res.status(201).json({ message: "Transaction created successfully", transaction: savedTransaction });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};



// Example function to create a new category
export const createCategory = async (req, res) => {
  try {
    const { userId, name, type } = req.body;
    const newCategory = new Category({ userId, name, type });
    const savedCategory = await newCategory.save();
    res.status(201).json({ message: "Category created successfully", category: savedCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
