import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResumeTips = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          5 Resume Tips to Land Your Dream Job
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Build a resume that stands out from the stack.
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          transition: "transform 0.3s",
          '&:hover': { transform: 'scale(1.02)' },
        }}
      >
        <Typography variant="h6" fontWeight="medium" gutterBottom>
           Tips:
        </Typography>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>Use a clean, ATS-friendly layout:</strong> Avoid graphics or columns.</li>
          <li><strong>Tailor each resume:</strong> Align with keywords from the job description.</li>
          <li><strong>Quantify impact:</strong> “Increased traffic by 30% in 3 months.”</li>
          <li><strong>Use strong action verbs:</strong> Designed, Led, Optimized, Built.</li>
          <li><strong>Keep it concise:</strong> Stick to 1 page for junior roles.</li>
        </ul>

        <Typography sx={{ mt: 2 }}>
          Need inspiration? Explore resume templates from leading platforms like Canva, Novoresume, or Zety.
        </Typography>
      </Box>

      <Button onClick={() => navigate("/")} sx={{ mt: 4 }} variant="contained">
        Back to Home
      </Button>
    </Container>
  );
};

export default ResumeTips;