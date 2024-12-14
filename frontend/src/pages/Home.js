import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Job Board!
      </Typography>
      <Typography variant="body1">
        Find your dream job or hire top talent. Explore various opportunities tailored to your needs.
      </Typography>
    </Container>
  );
};

export default Home;
