// routes/transactions.js
import express from 'express';
import Transaction from '../models/transactionSchema.js';  // Correct import
const router = express.Router();

// Create a new transaction
router.post('/add', async (req, res) => {
    const { userId, text, amount } = req.body; // Get data from the request body
    
    if (!text || !amount) {
        return res.status(400).json({ message: 'Text and amount are required' });
    }

    try {
        const newTransaction = new Transaction({
            userId, // Assuming the userId is passed from the frontend or authenticated user
            text,
            amount
        });

        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all transactions for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    
    try {
        const transactions = await Transaction.find({ userId });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete a transaction
router.delete('/delete/:transactionId', async (req, res) => {
    const { transactionId } = req.params;

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
