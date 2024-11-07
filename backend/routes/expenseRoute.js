import express from 'express';
import { createUser, sendExpense, createCategory } from "../controller/Expense.js";

const router = express.Router();

// Define routes
router.post('/users', createUser); // To create a new user
router.post('/expenses', sendExpense); // To create a new transaction
router.post('/categories', createCategory); // To create a new category

export default router;
