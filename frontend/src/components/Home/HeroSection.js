import React from "react";
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUserRole, isAuthenticated } from "../../utils/auth";

const HeroSection = () => {
  const navigate = useNavigate();
  const role = getUserRole();
  const loggedIn = isAuthenticated();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 4 },
        color: '#FFFFFF',
        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
        backgroundImage: `url(${require('../../images/luca-bravo-9l_326FISzk-unsplash.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 2,
      }}
    >
      <Typography
        variant={isMobile ? "h4" : "h3"}
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        Your Career Starts Here!
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Discover your dream job or hire top talents with ease.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        {(role !== 'employer' || !loggedIn) && (
          <Button
            variant="contained"
            color="secondary"
            sx={{ px: 4, py: 1.5 }}
            onClick={() => navigate('/jobs')}
          >
            Find Jobs
          </Button>
        )}

        {(role === 'employer' || !loggedIn) && (
          <Button
            variant="outlined"
            color="secondary"
            sx={{ px: 4, py: 1.5, borderColor: '#fff', color: '#fff' }}
            onClick={() => navigate('/post-job')}
          >
            Post a Job
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default HeroSection;
