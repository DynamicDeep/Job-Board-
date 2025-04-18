import React, { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import ApplyJobModal from "../components/ApplyJobModal";

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJobToApply, setSelectedJobToApply] = useState(null);

  const navigate = useNavigate();
  const userRole = "jobSeeker"; // Toggle this as needed

  const [titleFilter, setTitleFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const getJobs = async () => {
      const jobData = await fetchJobs();
      setJobs(jobData);
      setLoading(false);
    };
    getJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete job");

      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEdit = (job) => {
    setCurrentJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentJob(null);
  };

  const handleUpdate = async () => {
    try {
      const { title, company, location, description } = currentJob;

      const response = await fetch(`http://localhost:5000/api/jobs/${currentJob._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, company, location, description }),
      });

      if (!response.ok) throw new Error("Failed to update job");

      const updated = await response.json();
      setJobs(jobs.map((job) => (job._id === updated._id ? updated : job)));
      handleClose();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleApply = (job) => {
    setSelectedJobToApply(job);
    setApplyModalOpen(true);
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      job.company.toLowerCase().includes(companyFilter.toLowerCase()) &&
      job.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
  });

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

      {/* Filter Inputs */}
      <Box display="flex" gap={2} justifyContent="center" mb={4} flexWrap="wrap">
        <TextField label="Filter by Title" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />
        <TextField label="Filter by Company" value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)} />
        <TextField label="Filter by Location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} />
      </Box>

      <Grid container spacing={3}>
        {filteredJobs.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ width: "100%", mt: 2 }}>
            No jobs match your criteria
          </Typography>
        ) : (
          filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card
                sx={{
                  maxWidth: 360,
                  mx: "auto",
                  borderRadius: 3,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/360x140?text=Company+Logo"
                  alt="Company logo"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {job.title}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <BusinessIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {job.company}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.primary">
                    {job.description.length > 100
                      ? job.description.slice(0, 100) + "..."
                      : job.description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1,
                    px: 2,
                    pb: 2,
                  }}
                >
                  <Chip label="Open" color="success" />
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {userRole === "jobSeeker" && (
                      <>
                        <Button size="small" variant="contained" color="primary" onClick={() => handleApply(job)}>
                          Apply
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          onClick={() => navigate(`/job/${job._id}`)}
                        >
                          View Details
                        </Button>
                      </>
                    )}
                    {userRole === "admin" && (
                      <>
                        <Button size="small" variant="outlined" color="info" onClick={() => handleEdit(job)}>
                          Edit
                        </Button>
                        <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(job._id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            value={currentJob?.title || ""}
            onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
          />
          <TextField
            label="Company"
            value={currentJob?.company || ""}
            onChange={(e) => setCurrentJob({ ...currentJob, company: e.target.value })}
          />
          <TextField
            label="Location"
            value={currentJob?.location || ""}
            onChange={(e) => setCurrentJob({ ...currentJob, location: e.target.value })}
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            value={currentJob?.description || ""}
            onChange={(e) => setCurrentJob({ ...currentJob, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Apply Modal */}
      <ApplyJobModal
        open={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        job={selectedJobToApply}
      />
    </Box>
  );
};

export default JobList;
