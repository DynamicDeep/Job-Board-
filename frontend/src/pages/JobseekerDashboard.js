import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Chip,
  Divider,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UserInfoCard from '../components/UserInfoCard';
import JobCard from '../components/jobCard';

const JobseekerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keywords, setKeywords] = useState("");
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [recommendationError, setRecommendationError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/applications/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const fetchRecommendations = async () => {
    setLoadingRecommendations(true);
    setRecommendationError("");
    try {
      const res = await fetch(`http://localhost:5000/api/recommendations?keywords=${keywords}`);
      const data = await res.json();
      setRecommendedJobs(data);
    } catch (err) {
      setRecommendationError("Failed to fetch recommendations.");
    } finally {
      setLoadingRecommendations(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <UserInfoCard />

      {/* Recommendation Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          🔍 Get Job Recommendations
        </Typography>
        <TextField
          label="Enter keywords (e.g. developer, remote, react)"
          variant="outlined"
          fullWidth
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={fetchRecommendations}>
          Get Recommendations
        </Button>

        {loadingRecommendations && (
          <Typography sx={{ mt: 2 }}>Loading recommendations...</Typography>
        )}
        {recommendationError && (
          <Alert severity="error" sx={{ mt: 2 }}>{recommendationError}</Alert>
        )}

        {recommendedJobs.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Recommended Jobs:
            </Typography>
            <Grid container spacing={2}>
              {recommendedJobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} key={job._id}>
                  <JobCard job={job} userRole="jobseeker" onApply={() => {}} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

      {/* Applications Section */}
      <Typography variant="h5" mt={6} mb={2}>
        Jobs You Applied To
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : applications.length === 0 ? (
        <Typography>No job applications found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {applications.map((app) => (
            <Grid item xs={12} md={6} key={app._id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {app.jobId?.title || 'Job Title'} at {app.jobId?.company || 'Company'}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <WorkIcon fontSize="small" />
                    <Typography variant="body2">{app.jobId?.title || 'N/A'}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2">{app.jobId?.location || 'N/A'}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <CalendarMonthIcon fontSize="small" />
                    <Typography variant="body2">
                      Applied on {new Date(app.appliedAt).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box mt={2}>
                    <Chip label="Application Sent" color="success" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default JobseekerDashboard;
