import React from 'react';
import jobsData from './jobsData';
import { Card, CardContent, Typography, Grid, CardActions, Button, CardMedia, Box, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';

const Jobs = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Explore Job Opportunities
      </Typography>
      <Grid container spacing={3}>
        {jobsData.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card sx={{ maxWidth: 345, transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardMedia
                component="img"
                height="140"
                image={job.logo}
                alt={`${job.company} logo`}
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {job.title}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <BusinessIcon color="action" />
                  <Typography color="text.secondary">{job.company}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} marginTop={1}>
                  <LocationOnIcon color="action" />
                  <Typography color="text.secondary">{job.location}</Typography>
                </Box>
                <Typography variant="body2" color="text.primary" mt={2}>
                  {job.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Chip label={job.status} color={job.status === 'Open' ? 'success' : 'error'} />
                <Button size="small" variant="contained" color="primary">
                  Apply Now
                </Button>
                <Button size="small" variant="outlined" color="secondary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Jobs;
