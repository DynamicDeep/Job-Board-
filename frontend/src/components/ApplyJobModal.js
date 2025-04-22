// components/ApplyJobModal.js
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  LinearProgress,
  Alert
} from "@mui/material";

const ApplyJobModal = ({ open, onClose, jobId }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    coverLetter: "",
    cv: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      setForm((f) => ({ ...f, cv: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("coverLetter", form.coverLetter);
      data.append("cv", form.cv);

      const res = await fetch(
        `http://localhost:5000/api/applications/${jobId}`,
        {
          method: "POST",
          body: data
        }
      );
      if (!res.ok) throw new Error("Failed to submit application");
      await res.json();
      setSuccess("Application submitted successfully!");
      // Optionally clear form or close after a timeout:
      setForm({ name: "", email: "", coverLetter: "", cv: null });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Apply for This Job</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <TextField
            name="name"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="email"
            label="Email Address"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="coverLetter"
            label="Cover Letter"
            multiline
            rows={4}
            value={form.coverLetter}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" component="label">
            Upload CV
            <input
              type="file"
              name="cv"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />
          </Button>
          {form.cv && <Box>{form.cv.name}</Box>}
          {loading && <LinearProgress />}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !form.cv}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyJobModal;
