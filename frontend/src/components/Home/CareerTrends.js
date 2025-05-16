import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CareerTrends = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Top Career Trends in 2025
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Stay ahead of the curve with evolving industry insights.
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fefefe",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          transition: "transform 0.3s",
          '&:hover': { transform: 'scale(1.02)' },
        }}
      >
        <Typography variant="h6" gutterBottom>
           What to Expect:
        </Typography>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Remote-first roles are becoming the default in tech and creative industries.</li>
          <li>AI, cloud computing, and cybersecurity skills are in high demand.</li>
          <li>Sustainability and ESG-focused jobs are rising across sectors.</li>
          <li>Digital-first customer service and UX design are core to product success.</li>
          <li>Learning & upskilling culture is prioritized by top employers.</li>
        </ul>

        <Typography sx={{ mt: 2 }}>
          Following job market blogs and LinkedIn news can help you adapt your path early.
        </Typography>
      </Box>

      <Button onClick={() => navigate("/")} sx={{ mt: 4 }} variant="contained">
        Back to Home
      </Button>
    </Container>
  );
};

export default CareerTrends;