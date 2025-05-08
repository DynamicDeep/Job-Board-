import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
  Link
} from '@mui/material';

const ApplicantsModal = ({ open, onClose, jobId }) => {
  const [loading, setLoading] = useState(false);
  const [applicants, setApplicants] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!jobId) return;
      setLoading(true);

      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/applications/by-job/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setApplicants(data);
      } catch (err) {
        console.error('Failed to fetch applicants', err);
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchApplicants();
  }, [open, jobId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Applicants</DialogTitle>
      <DialogContent dividers>
      {loading ? (
  <CircularProgress />
) : !Array.isArray(applicants) ? (
  <Typography>Error loading applicants.</Typography>
) : applicants.length === 0 ? (
  <Typography>No applications found for this job.</Typography>
) : (
  <List>
    {applicants.map((applicant, idx) => (
      <React.Fragment key={idx}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={`${applicant.applicantId?.firstName || 'Unknown'} ${applicant.applicantId?.lastName || ''}`}
            secondary={
                <>
                <Typography variant="body2" color="textPrimary">
                  Email: {applicant.applicantId?.email || 'N/A'}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Contact: {applicant.applicantId?.contact || 'N/A'}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Location: {applicant.applicantId?.location || 'N/A'}
                </Typography>
                <Typography variant="body2" mt={1}>
                  Cover Letter:
                </Typography>
                <Typography variant="body2">{applicant.coverLetter || 'N/A'}</Typography>
                <br />
                <Link href={`http://localhost:5000/${applicant.cv}`} target="_blank" rel="noopener">
                  View CV
                </Link>
              </>              
            }
          />
        </ListItem>
        <Divider component="li" />
      </React.Fragment>
    ))}
  </List>
)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicantsModal;
