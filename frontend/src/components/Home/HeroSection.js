import React from "react";
import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => {
    return (
        <Box
        sx={{
            textAlign: 'center',
            py: 6,
            color: '#FFFFFF',
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
            backgroundImage: `url(${require('../../images/luca-bravo-9l_326FISzk-unsplash.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
        }}
        >
            <Typography variant="h3" component="h1" gutterBottom sx={{fontWeight: 'bold'}}>
                Your Career Starts Here!
            </Typography>
            <Typography variant="h6" sx={{ mb: 4}}>
                Discover your dream job or hire top talents with ease.
            </Typography>
            <Button variant="contained" color="secondary" sx={{mx: 1, px: 4, py: 1.5}}>
                Find Jobs
            </Button>
            <Button variant="outlined" color="secondary" sx={{mx: 1, px: 4, py: 1.5, BorderColor: '#fff', colors: '#fff'}}>
                Post a Job
            </Button>
        </Box>
    );
};

export default HeroSection;
