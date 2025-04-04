import React, { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobService";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Button,
  CardMedia,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      const jobData = await fetchJobs();
      setJobs(jobData);
      setLoading(false);
    };
    getJobs();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Explore Job Opportunities
      </Typography>

      <Grid container spacing={3}>
        {jobs.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ width: "100%", mt: 2 }}>
            No jobs available
          </Typography>
        ) : (
          jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card
                sx={{
                  maxWidth: 345,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/300x140?text=Job+Logo"
                  alt="Company logo"
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {job.title}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <BusinessIcon color="action" />
                    <Typography color="text.secondary">{job.company}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <LocationOnIcon color="action" />
                    <Typography color="text.secondary">{job.location}</Typography>
                  </Box>
                  <Typography variant="body2" mt={2}>
                    {job.description.length > 100
                      ? job.description.slice(0, 100) + "..."
                      : job.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Chip label="Open" color="success" />
                  <Button size="small" variant="contained" color="primary">
                    Apply Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default JobList;
