import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import JobList from "./pages/JobList";
import PostJob from './pages/PostJob';
import JobDetails from './pages/JobDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post-job" element={<PostJob />} /> 
        <Route path="/job/:id" element={<JobDetails />} />
 
      </Routes>
    </Router>
  );
}

export default App;
