import React from "react";
import { Box, Typography, Grid2, Paper } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const HowItWorksSection = () => {
    const jobSeekerSteps = [
        {
            icon: <PersonSearchIcon fontSize="large" />,
            title: "Sign Up",
            description: "Create an account and set up your profile.",
        },

        {
            icon: <WorkOutlineIcon fontSize="large" />,
            title: "Browse Jobs",
            description: "Explore opportunities tailored to your skills.",
        },

        {
            icon: <CheckCircleOutlineIcon fontSize="large" />,
            title: "Apply Easily",
            description: "Submit applications in just a few clicks.",
        },
    ];

    const employerSteps = [
        {
            icon: <PostAddIcon fontSize="large" />,
            title: "Post Jobs",
            description: "List your openings to reach top talents.",
        },

        {
            icon: <AssignmentIcon fontSize="large" />,
            title: "Review Applications",
            description: "Screen candidates and shortlist the best ones.",
        },

        {
            icon: <GroupAddIcon fontSize="large" />,
            title: "Hire the Best",
            description: "Select the ideal candidate for your role.",
        },
    ];

    return (
        <Box sx={{ py: 6, px: 3, textAlign: "center", backgroundColor: "f4f4f4"}}>
            <Typography variant="h4" component="h2" gutterBottom>
                How It Works
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 4}}>
                Simple Steps to get started for job seekers and employers.
            </Typography>

            <Grid2 container spacing={4} justifyContent="center">
                <Grid2 item xs={12} md={6}>
                    <Typography variant="h5" sx={{ mb: 3}}>
                        For Job Seekers
                    </Typography>

                    <Grid2 container spacing={3}>
                        {jobSeekerSteps.map((step, index) => (
                            <Grid2 item xs={12} sm={4} key={index}>
                                <Paper
                                    sx={{
                                        p: 3,
                                        textAlign: "center",
                                        borderRadius: 2,
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    {step.icon}
                                    <Typography
                                        variant="h6"
                                        sx={{mt: 2, fontWeight: "bold", color: "#333" }}
                                    >
                                        {step.title}
                                    </Typography>

                                    <Typography variant="body2" sx={{ mt: 1}}>
                                        {step.description}
                                    </Typography>
                                </Paper>
                            </Grid2>
                        ))}
                    </Grid2>
                </Grid2>

                    <Grid2 item xs={12} md={6}>
                        <Typography variant="h5" sx={{ mb: 3}}>
                            For Employers
                        </Typography>

                        <Grid2 container spacing={3}>
                            {employerSteps.map((step, index) => (
                                <Grid2 item xs={12} sm={4} key={index}>
                                    <Paper 
                                        elevation={3}
                                        sx={{
                                            p: 3,
                                            textAlign: "center",
                                            borderRadius: 2,
                                            backgroundColor: "#fff", 
                                        }}
                                        >
                                            {step.icon} 
                                        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "#333"}}>
                                            {step.title}    
                                        </Typography> 

                                        <Typography variant="body2" sx={{ mt: 1}}>
                                            {step.description}
                                        </Typography>
                                        </Paper>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
            </Grid2>
        </Box>
    );
}; 

export default HowItWorksSection;