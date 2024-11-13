//backend/server.js
import app from "./app.js";

const PORT = process.env.PORT || 5000; // Use 5001 instead of 5000


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  // Template string correction
});

