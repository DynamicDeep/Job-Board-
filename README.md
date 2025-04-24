Job Board

GitHub Repository: https://github.com/DynamicDeep/Job-Board-

Overview

Job Board is a simple web application that allows users to register, post job listings, and search for open positions. It consists of a React-based frontend and a Node.js/Express backend with MongoDB for data storage.

Prerequisites

Before running the application locally, make sure you have installed:

Node.js (v14 or newer)

npm (comes with Node.js)

MongoDB (community edition) running on your machine, or Docker (if you prefer a containerized setup)

Quick Start (Local MongoDB)

Clone the repository:

git clone https://github.com/DynamicDeep/Job-Board-
cd Job-Board-

Install dependencies for both services:

# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install

Running the Application

1. Frontend

In one terminal, start the React frontend:

cd frontend
npm start

The app will open at http://localhost:3000.

2. Backend

In a separate terminal, start the backend server:

cd backend
npm run dev

By default, the server listens on http://localhost:5000 and connects to a local MongoDB instance at mongodb://localhost:27017/jobboard.

Docker Option

If you prefer not to install MongoDB locally, you can use Docker:

Create a Dockerfile and docker-compose.yml (already provided).

Run:

git clone https://github.com/DynamicDeep/Job-Board-
cd Job-Board-
docker-compose up --build

The frontend will be available at http://localhost:3000 and the backend at http://localhost:5000.

Project Structure

Job-Board-
├── frontend/         # React application
├── backend/          # Express server and API
├── Dockerfile        # Docker image for the app
├── docker-compose.yml# Orchestrates app + MongoDB
└── README.md         # This file

Contact & Support

If you encounter any issues or have questions, please open an issue on GitHub or reach out to Deep Ahir.