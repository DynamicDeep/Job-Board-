import React, { useEffect, useState } from "react";
import { fetchJobs } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import ApplyJobModal from "../components/ApplyJobModal";
import { jwtDecode } from "jwt-decode";
import JobCard from "../components/jobCard";

import {
  Typography,
  Grid,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJobToApply, setSelectedJobToApply] = useState(null);
  const [titleFilter, setTitleFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let userRole = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  useEffect(() => {
    const getJobs = async () => {
      const jobData = await fetchJobs();
      setJobs(jobData);
      setLoading(false);
    };
    getJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!token) return alert("No token found");
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
    if (!token) return alert("No token found");
    try {
      const { title, company, location, description } = currentJob;

      const response = await fetch(`http://localhost:5000/api/jobs/${currentJob._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
              <JobCard
                job={job}
                userRole={userRole}
                onApply={handleApply}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid>
          ))
        )}
      </Grid>

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
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <ApplyJobModal
        open={applyModalOpen}
        onClose={() => {
          setApplyModalOpen(false);
          setSelectedJobToApply(null);
        }}
        jobId={selectedJobToApply?._id}
      />
    </Box>
  );
};

export default JobList;
