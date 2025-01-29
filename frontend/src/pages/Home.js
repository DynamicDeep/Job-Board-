import React from 'react';
import { Container } from '@mui/material';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import BlogSection from '../components/Home/BlogSection';
import Footer from '../components/Home/footer';

const Home = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BlogSection />
      <Footer />
    </Container>
  );
};

export default Home;
