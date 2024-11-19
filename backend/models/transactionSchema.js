//backend/models/transactionSchema.js

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  transaction: {
    type: String,
    enum: ['cr', 'dr'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Use export default
export default mongoose.model('Transaction', transactionSchema);
