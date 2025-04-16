//backend>server.js
import app from './app.js';
import { dbConnection } from './database/dbConnection.js';
import User from './models/userSchema.js';
import Transaction from './models/transactionSchema.js';

const PORT = process.env.PORT || 5000;

async function createSampleData() {
    try {
        if (process.env.NODE_ENV !== 'development') {
            console.log('Skipping sample data creation in non-development environment.');
            return;
        }
        

        let user = await User.findOne({ username: 'Shivangi Chauhan' });
        if (!user) {
            user = await User.create({
                username: 'Shivangi Chauhan',
                email: 'shivangichauhan43788@gmail.com',
                password: 'Shivangi@123',
                confirmpassword: 'Shivangi@123',
            });
            console.log('Sample user created successfully.');
        }

        const transaction = await Transaction.create({
            userId: user._id,
            title: 'Sample Transaction',
            amount: 100,
            transaction: 'dr',
            date: Date.now(),
        });
        console.log('Sample transaction created successfully:', transaction);

    } catch (error) {
        console.error('Error creating sample data:', error);
    }
}

async function startServer() {
    try {
        await dbConnection();  // Ensure the database is connected first
        console.log('Database connected successfully.');
        createSampleData();  // Create sample data after DB connection

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
        
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

startServer();
