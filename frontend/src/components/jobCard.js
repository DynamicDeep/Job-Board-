import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Chip,
  CardMedia,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, userRole, onApply, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
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
          {userRole === "jobseeker" && (
            <>
              <Button size="small" variant="contained" color="primary" onClick={() => onApply(job)}>
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
              <Button size="small" variant="outlined" color="info" onClick={() => onEdit(job)}>
                Edit
              </Button>
              <Button size="small" variant="outlined" color="error" onClick={() => onDelete(job._id)}>
                Delete
              </Button>
            </>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default JobCard;
