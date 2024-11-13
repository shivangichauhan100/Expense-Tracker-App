// backend/controller/Expense.js
import User from "../models/userSchema.js";
import Transaction from "../models/transactionSchema.js";  // Change 'transaction' to 'Transaction'

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
  console.log("Incoming request body:", req.body); // Log the incoming request body
  const { userId, text, amount } = req.body;

  // Validation for required fields
  if (!userId || !text || !amount) {
      return res.status(400).json({ error: "All fields (userId, text, amount) are required." });
  }

  try {
      // Create a new transaction
      const newTransaction = new Transaction({ userId, text, amount });
      const savedTransaction = await newTransaction.save();
      res.status(201).json({ message: "Transaction created successfully", transaction: savedTransaction });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
// controller/Expense.js
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Example validation
    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    // Create category logic (you would need a Category model for this)
    // const newCategory = new Category({ name });
    // const savedCategory = await newCategory.save();

    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
