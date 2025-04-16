//backend>routes>eXpenseRoute.js
import express from 'express';
import mongoose from "mongoose";

import { createUser, sendExpense } from "../controller/Expense.js"; // Correctly importing sendExpense
const router = express.Router();

// Define routes
router.post('/users', createUser); // To create a new user
router.post('/transaction', sendExpense); // Corrected to use sendExpense

export default router;
