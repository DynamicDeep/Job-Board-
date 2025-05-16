import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InterviewGuide = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Ace Your Job Interview
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Practical strategies to help you impress and succeed.
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f1f1f1",
          p: 4,
          borderRadius: 3,
          boxShadow: 2,
          transition: "transform 0.3s",
          '&:hover': { transform: 'scale(1.02)' },
        }}
      >
        <Typography variant="h6" gutterBottom>
           Interview Prep Guide:
        </Typography>
        <ol style={{ paddingLeft: '20px' }}>
          <li>Research the company thoroughly — check recent news, blogs, and values.</li>
          <li>Practice common questions — "Tell me about yourself", "Your strengths/weaknesses".</li>
          <li>Use the STAR method for behavioral questions.</li>
          <li>Show curiosity — ask insightful questions at the end.</li>
          <li>Dress appropriately, smile, and follow up with a thank-you email.</li>
        </ol>

        <Typography sx={{ mt: 2 }}>
          Consider mock interviews with friends or mentors, and always review your resume before walking in.
        </Typography>
      </Box>

      <Button onClick={() => navigate("/")} sx={{ mt: 4 }} variant="contained">
        Back to Home
      </Button>
    </Container>
  );
};

export default InterviewGuide;