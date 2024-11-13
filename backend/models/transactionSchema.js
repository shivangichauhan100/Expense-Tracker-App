//backend/models/transactionSchema.js
import mongoose from 'mongoose';

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
