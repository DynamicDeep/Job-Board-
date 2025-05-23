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
  Button,
  IconButton
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import UserInfoCard from '../components/UserInfoCard';
import ApplicantsModal from '../components/ApplicantsModal';
import EditJobModal from './EditJobModal';

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/jobs/employer/my-jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching employer jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleViewApplicants = (jobId) => {
    setSelectedJobId(jobId);
    setModalOpen(true);
  };

  const handleEditJobClick = (job) => {
    setEditJob(job);
    setEditModalOpen(true);
  };

  const handleJobUpdate = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <UserInfoCard />

      <Typography variant="h5" mt={6} mb={2}>
        Jobs You've Posted
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : jobs.length === 0 ? (
        <Typography>No jobs posted yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} key={job._id}>
              <Card sx={{ boxShadow: 3, position: 'relative' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {job.title} at {job.company}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <WorkIcon fontSize="small" />
                    <Typography variant="body2">{job.title}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2">{job.location}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <CalendarMonthIcon fontSize="small" />
                    <Typography variant="body2">
                      Posted on {new Date(job.postedAt).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Chip label="Live" color="success" />
                    <Box display="flex" gap={1}>
                      <Button variant="outlined" size="small" onClick={() => handleViewApplicants(job._id)}>
                        View Applicants
                      </Button>
                      <IconButton onClick={() => handleEditJobClick(job)}>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <ApplicantsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        jobId={selectedJobId}
      />

      {editJob && (
        <EditJobModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          job={editJob}
          onSave={handleJobUpdate}
          mode="employer"
        />
      )}
    </Box>
  );
};

export default EmployerDashboard;