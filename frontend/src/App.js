import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Contact from './pages/Contact';
import JobDetails from "./pages/jobDetails";
import JobList from "./pages/JobList";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/job/:id" element={<JobDetails />} />  
      </Routes>
    </Router>
  );
}

export default App;
