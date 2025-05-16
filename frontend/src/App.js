import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import JobList from "./pages/JobList";
import PostJob from './pages/PostJob';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfileForm from './pages/EditProfileForm';

// Dashboard Pages
import AdminDashboard from './pages/AdminDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import JobseekerDashboard from './pages/JobseekerDashboard';

// ProtectedRoute Wrapper
import ProtectedRoute from './components/ProtectedRoute';

// Sub pages for home (Blog Section)
import ResumeTips from './components/Home/ResumeTips';
import InterviewGuide from './components/Home/InterviewGuide';
import CareerTrends from './components/Home/CareerTrends';
import Footer from './components/Home/footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/EditProfileForm" element={<EditProfileForm />} />

        {/* Blog Insight Pages */}
        <Route path="/insights/resume-tips" element={<ResumeTips />} />
        <Route path="/insights/interview-guide" element={<InterviewGuide />} />
        <Route path="/insights/career-trends" element={<CareerTrends />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer-dashboard"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobseeker-dashboard"
          element={
            <ProtectedRoute allowedRoles={['jobseeker']}>
              <JobseekerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
