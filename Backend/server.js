const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env file

const app = express(); // Create express app
const port = 5000; // Define port

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Use MONGO_URI directly
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
  

// Job Routes
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

// Simple Test Route
app.get('/api/test', (req, res) => {
    res.send('Hello, Job Board API is running!');
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
