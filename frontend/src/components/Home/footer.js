import React from "react";
import {Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, X, LinkedIn, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box 
      sx={{
        backgroundColor: "#000000",
        color: "#fff",
        py: 4,
        mt: 4, 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Branding Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Job Board
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Your go-to platform for job search and career guidance.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1}}>
              Quick Links
            </Typography>

            <Box>
              <Link href="#" underline="none" color="inherit">
                About Us
              </Link>
            </Box>

            <Box>
              <Link href="#" underline="none" color="inherit">
                Contact
              </Link>
            </Box>

            <Box>
              <Link href="#" underline="none" color="inherit">
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1}}>
              Follow Us 
            </Typography>

            <Box>
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit">
                <X />
              </IconButton>
              <IconButton href="#" color="inherit">
                <LinkedIn />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box sx={{ textAlign: "center", mt: 4}}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Job Board. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

