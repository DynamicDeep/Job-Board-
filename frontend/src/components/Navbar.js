import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { isAuthenticated, getUserRole, logout } from '../utils/auth';

const Navbar = () => {
  const loggedIn = isAuthenticated();
  const role = getUserRole();

  const handleLogout = () => {
    logout();
  };

  const renderDashboardButton = () => {
    if (role === 'admin') return <Button color="inherit" component={Link} to="/admin-dashboard">Dashboard</Button>;
    if (role === 'employer') return <Button color="inherit" component={Link} to="/employer-dashboard">Dashboard</Button>;
    if (role === 'jobseeker') return <Button color="inherit" component={Link} to="/jobseeker-dashboard">Dashboard</Button>;
    return null;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Job Board
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/jobs">Jobs</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>

        {loggedIn ? (
          <>
            {renderDashboardButton()}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
