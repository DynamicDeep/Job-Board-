import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserInfoCard from '../components/UserInfoCard';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditUser(user);
    setEditForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      contact: user.contact || '',
      location: user.location || ''
    });
    setDialogOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${editUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      if (!res.ok) throw new Error('Update failed');
      const updatedUser = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );
      setDialogOpen(false);
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleDelete = async (userId) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Delete failed');
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleVerify = async (userId, currentStatus) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/verify-employer/${userId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isVerified: !currentStatus })
      });

      if (!res.ok) throw new Error('Verification update failed'); 

      const updatedUser = await res.json();

      //Update user list 
      setUsers((prev) => 
        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );
    } catch (err) {
      console.error('Verification update failed:', err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <UserInfoCard />

      <Typography variant="h5" mt={6} mb={2}>
        All Registered Users
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} md={6} key={user._id}>
              <Card sx={{ p: 2, position: 'relative' }}>
                <CardContent>
                  {user.role === 'employer' && (
                    <Chip
                      label = {user.isVerified ? 'VERIFIED' : 'UNVERIFIED'}
                      color = {user.isVerified ? 'success': 'warning'}
                      sx = {{ mt: 1, ml: 1 }}
                    />
                  )}
                  <Chip label = {user.role.toUpperCase()} sx = {{ mt: 1 }} />
                  <Typography variant="h6">
                    {user.firstName || 'N/A'} {user.lastName || ''}
                  </Typography>
                  <Typography>Email: {user.email}</Typography>
                  <Typography>Contact: {user.contact || 'N/A'}</Typography>
                  <Typography>Location: {user.location || 'N/A'}</Typography>
                  <Chip label={user.role.toUpperCase()} sx={{ mt: 1 }} />
                </CardContent>
                <Box position="absolute" top={8} right={8}>
                  <IconButton onClick={() => handleEditClick(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                  {user.role === 'employer' && (
                    <IconButton onClick={() => handleVerify(user._id, user.isVerified)}>
                      <Chip
                        label = {user.isVerified ? 'Unverify' : 'Verify'}
                        color = {user.isVerified ? 'error' : 'primary'}
                        size= "small"
                      />
                    </IconButton>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="First Name"
            name="firstName"
            value={editForm.firstName}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={editForm.lastName}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={editForm.email}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            label="Contact Number"
            name="contact"
            value={editForm.contact}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            label="Location"
            name="location"
            value={editForm.location}
            onChange={handleFormChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
