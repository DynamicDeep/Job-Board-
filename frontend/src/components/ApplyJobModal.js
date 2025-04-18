import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

const ApplyJobModal = ({ open, onClose, job }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cv, setCv] = useState(null);

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!name || !email || !coverLetter || !cv) {
      alert("Please fill in all fields and upload your CV.");
      return;
    }

    const formData = new FormData();
    formData.append("jobId", job._id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("coverLetter", coverLetter);
    formData.append("cv", cv);

    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Application submission failed");

      alert("Application submitted successfully!");
      onClose(); // Close modal
      // Reset form
      setName("");
      setEmail("");
      setCoverLetter("");
      setCv(null);
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Apply for {job?.title}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Cover Letter"
          multiline
          rows={4}
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          fullWidth
        />
        <Box>
          <Typography variant="body2" gutterBottom>
            Upload CV (PDF, DOC, etc.)
          </Typography>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit Application
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyJobModal;
