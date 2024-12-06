require('dotenv').config();  // This loads the .env file

const mongoose = require('mongoose');

// Connect to MongoDB using the URI stored in .env file
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

const express = require('express'); // Import the Express library
const app = express(); // Create an instance of Express
const port = 5000; // Port where the server will listen

// Middleware to parse incoming JSON requests
app.use(express.json());

// Simple route to check if the server is running
app.get('/', (req, res) => {
  res.send('Hello, Job Board API is running!');
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
