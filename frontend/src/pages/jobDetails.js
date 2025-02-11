import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobsData from "./jobsData";
import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const JobDetails = () => {
  const { id } = useParams(); //Get the Job ID from the URL 
  const navigate = useNavigate();

  //Find the job with the matching ID
  const  job = jobsData.find((job) => job.id.toString() === id);

  if (!job) {
    return <Typography variant="h5" align="center">
      Job Not Found 
    </Typography>;
  }

  return (
    <Box sx={{maxWidth: 800, margin: "auto", padding: 4}}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        variant="contained"
      >
        Back
      </Button>

      <Card sx={{ marginTop: 2 }}>
        <CardMedia
          component="img"
          height="200"
          image={job.company}
          alt={`${job.company} logo`}
        />

        <CardContent>
          <Typography variant="h4">{job.title}</Typography>
          <Typography variant="h6" color="textSecondary">{job.company}</Typography>
          <Typography variant="subtitle1">{job.location}</Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>{job.description}</Typography>

          <Button 
            variant="contained"
            color="primary"
            sx={{ marginTop: 3}}
          >
            Apply Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobDetails;
