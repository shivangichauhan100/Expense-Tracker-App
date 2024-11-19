// backend/database/dbConnection.js
import mongoose from "mongoose";

export const dbConnection = () => {
  return mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "EXPENSETRACKER",
    })
    .then(() => {
      console.log("Connected to database successfully");
    })
    .catch((err) => {
      console.error(`Some error occurred while connecting to the database: ${err}`);
      process.exit(1); // Exit the process if the DB connection fails
    });
};
