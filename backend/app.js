import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from './database/dbConnection.js'; // with .js extension
import { errorMiddleware } from "./error/error.js";
import expenseRouter from "./routes/expenseRoute.js";
import authRoutes from './routes/auth.js';

const app = express();

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["POST", "GET", "PUT", "DELETE"], // Allow more HTTP methods
        credentials: true,
    })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to handle URL-encoded data (usually from forms)
app.use(express.urlencoded({ extended: true }));

// Use auth routes for authentication
app.use('/api/v1/auth', authRoutes); // Prefix the auth routes with '/api/v1/auth'

// Use expense routes for expense-related actions
app.use('/api/v1/expense', expenseRouter); 



// Connect to the database
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
