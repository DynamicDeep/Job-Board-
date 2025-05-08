require('dotenv').config(); // Load .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');


const app = express(); // Create express app
const port = 5000; // Define port

// Middleware to parse JSON
app.use(cors());
app.use(express.json());
//Register
app.use('/api/auth', authRoutes);

// admin authentication
app.use('/api/admin', require('./routes/adminRoutes'));

// Use MONGO_URI directly
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Job Routes
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

// Application Routes
const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

// Serve uploaded CV files
app.use('/uploads', express.static('uploads'));

// Simple Test Route
app.get('/api/test', (req, res) => {
    res.send('Hello, Job Board API is running!');
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
