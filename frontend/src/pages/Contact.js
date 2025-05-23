import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Contact = () => {
  //State to hold form data
  const [formData, setformdata] = useState({
    name: '',
    email: '',
    message: '',
  });

  //State to track the submisson 
  const [submitted, setSubmitted] = useState(false);

  // Function to handle changes in the form fields
  const handleChange = (e) => {
    const { name, value} = e.target;
    setformdata ({...formData, [name]: value});
  };

  //Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); //Prevent page reload
    setSubmitted(true); //Submit the form and show thank you massage
  };

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Contact Us
      </Typography>

      {!submitted ? (
        <Box component="form" onSubmit={handleSubmit} sx={{mt: 2}}>
          <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
          />

          <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          />

          <TextField
          fullWidth
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          margin="normal"
          required
          />

          <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      ) : (
        <Typography variant="h6" sx={{mt: 2 }}>
          Thank you for reaching out! We'll get back to you soon. 
        </Typography>
      )}
    </Container>
  );
};

export default Contact;