import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
  InputAdornment
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contact: "",
    location: "",
    role: "jobseeker"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container maxWidth="lg" sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
        {/* LEFT IMAGE PANEL */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage: `url('/images/RegisterImage.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            color: "#FFFFFF",
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
          }}
        >
          <Box position="relative" zIndex={1} textAlign="center">
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Join the Platform
            </Typography>
            <Typography variant="h6">
              Create your account to start exploring or hiring talent.
            </Typography>
          </Box>
        </Grid>

        {/* RIGHT FORM PANEL */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 6, backgroundColor: "white", height: "100%" }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Register
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                required
                margin="normal"
                value={form.firstName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                required
                margin="normal"
                value={form.lastName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Email Address"
                name="email"
                type="email"
                fullWidth
                required
                margin="normal"
                value={form.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
                margin="normal"
                value={form.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Contact Number"
                name="contact"
                fullWidth
                required
                margin="normal"
                value={form.contact}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Location"
                name="location"
                fullWidth
                required
                margin="normal"
                value={form.location}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                select
                label="Role"
                name="role"
                fullWidth
                required
                margin="normal"
                value={form.role}
                onChange={handleChange}
              >
                <MenuItem value="jobseeker">Job Seeker</MenuItem>
                <MenuItem value="employer">Employer</MenuItem>
              </TextField>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1, fontWeight: "bold", py: 1.2, backgroundColor: "#000" }}
              >
                Register
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/login")}
              >
                Already have an account? Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
