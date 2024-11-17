import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from './database/dbConnection.js';
import ErrorHandler from './error/error.js';

import expenseRouter from "./routes/expenseRoute.js";
import authRoutes from './routes/auth.js';
import User from './models/userSchema.js';
import Transaction from './models/transactionSchema.js';

const app = express();

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
    })
);

// Function to create a sample user and transaction
async function createSampleData() {
    try {
        // Check if a user with the specified username already exists
        let user = await User.findOne({ username: 'Shivangi Chauhan' });

        // If user doesn't exist, create a new one
        if (!user) {
            user = await User.create({
                username: 'Shivangi Chauhan',
                email: 'shivangichauhan43788@gmail.com',
                password: 'Shivangi@123',
                confirmpassword: 'Shivangi@123'
            });
            console.log('Sample user created successfully.');
        } else {
            console.log('User already exists, skipping creation.');
        }

        // Insert a sample transaction using the user's _id
        await Transaction.create({
            userId: user._id,
            text: 'Sample Transaction',
            amount: 100,
            createdAt: Date.now(),
        });
        console.log('Sample transaction created successfully.');

    } catch (error) {
        console.error('Error creating sample data:', error);
    }
}
// Call function to create sample data
createSampleData();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to handle URL-encoded data (usually from forms)
app.use(express.urlencoded({ extended: true }));

// Use auth routes for authentication
app.use('/api/v1/auth', authRoutes);

// Use expense routes for expense-related actions
app.use('/api/v1/expense', expenseRouter);

// Connect to the database
dbConnection();

// Error handling middleware
app.use(ErrorHandler); // Uncomment and ensure ErrorHandler is correctly defined

export default app;
