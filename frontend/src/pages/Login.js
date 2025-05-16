import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      const token = data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const role = decoded.role;

      localStorage.setItem("userRole", role); 

      if (role === "jobseeker") navigate("/jobseeker-dashboard");
      else if (role === "employer") navigate("/employer-dashboard");
      else if (role === "admin") navigate("/admin-dashboard");
      else navigate("/");
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
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage: `url('/images/Login2.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#FFFFFF",
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="h6" align="center">
            Discover your dream job or manage your postings.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ p: 6, backgroundColor: "white", height: "100%" }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Login
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1, fontWeight: "bold", py: 1.2, backgroundColor: "#000" }}
              >
                Login
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;