import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Avatar,
  Grid,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const UserInfoCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) return null;

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              <PersonIcon />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" gutterBottom>
              Welcome, {user.firstName || "Unknown"} {user.lastName || ""}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <EmailIcon fontSize="small" />
              <Typography variant="body2">{user.email || "N/A"}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">{user.contact || "N/A"}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">{user.location || "N/A"}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <BadgeIcon fontSize="small" />
              <Chip label={user.role ? user.role.toUpperCase() : "N/A"} color="primary" />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
