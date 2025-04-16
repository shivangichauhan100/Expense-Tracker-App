//backend>app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import expenseRouter from './routes/expenseRoute.js';
import authRoutes from './routes/auth.js';
import User from './models/userSchema.js';
import Transaction from './models/transactionSchema.js';
import ErrorHandler from './error/error.js';

const app = express();

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
        credentials: true,
    })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to handle URL-encoded data (usually from forms)
app.use(express.urlencoded({ extended: true }));

// Routes for authentication and expense
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/expense', expenseRouter);

// Error handling middleware
app.use(ErrorHandler);

export default app;
