//backend>routes>transactions.js
import express from 'express';
import mongoose from 'mongoose';
import Transaction from '../models/transactionSchema.js';
const router = express.Router();

// Create a new transaction
router.post('/add', async (req, res) => {
    const { userId, title, amount, transaction } = req.body;

    if (!title || !amount || !transaction) {
        return res.status(400).json({ message: 'Title, amount, and transaction type are required' });
    }

    // Validate transaction type
    if (!['cr', 'dr'].includes(transaction)) {
        return res.status(400).json({ message: 'Transaction type must be either "cr" or "dr"' });
    }

    try {
        const newTransaction = new Transaction({
            userId,
            title,
            amount,
            transaction
        });

        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all transactions for a user with pagination
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;  // Default to page 1
    const limit = parseInt(req.query.limit) || 10;  // Default to 10 items per page

    try {
        const transactions = await Transaction.find({ userId })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete a transaction
router.delete('/delete/:transactionId', async (req, res) => {
    const { transactionId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
        return res.status(400).json({ message: 'Invalid transaction ID' });
    }

    try {
        const transaction = await Transaction.findByIdAndDelete(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
