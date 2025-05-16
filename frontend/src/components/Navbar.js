import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getUserRole, logout } from '../utils/auth';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [role, setRole] = useState(getUserRole());
  const location = useLocation();
  const navigate = useNavigate();

  // Detect route change and re-check auth state
  useEffect(() => {
    setLoggedIn(isAuthenticated());
    setRole(getUserRole());
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setRole(null);
    navigate('/login');
  };

  const renderRoleBasedLinks = () => {
    if (role === 'admin') {
      return (
        <>
          <Button color="inherit" component={Link} to="/admin-dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/EditProfileForm">Edit Profile</Button>
        </>
      );
    }

    if (role === 'employer') {
      return (
        <>
          <Button color="inherit" component={Link} to="/employer-dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/post-job">Post Job</Button>
          <Button color="inherit" component={Link} to="/EditProfileForm">Edit Profile</Button>
        </>
      );
    }

    if (role === 'jobseeker') {
      return (
        <>
          <Button color="inherit" component={Link} to="/jobseeker-dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/EditProfileForm">Edit Profile</Button>
        </>
      );
    }

    return null;
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: "#fff", textDecoration: "none" }}>
          Job Board
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/jobs">Jobs</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>

          {loggedIn ? (
            <>
              {renderRoleBasedLinks()}
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
