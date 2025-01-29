import React from "react";
import { Box, Typography, Grid2, Paper } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedIcon from "@mui/icons-material/Verified";

const FeaturesSection = () => {
    const features = [
        {
            icon: <WorkIcon fontSize="large" />,
            title: "Wide Job Variety",
            description: "Find jobs from various industries and locations tailored to your skills.",
        },

        {
            icon: <SearchIcon fontSize="large" />,
            title: "Easy Job Search",
            description: "Quickly search and filter jobs with advanced search options.",
        },

        {
            icon: <VerifiedIcon fontSize="large" />,
            title: "Trusted by Organisations",
            description: "We partner with leading companies to bring you the best opportunities."
        },
    ];

    return (
        <Box sx={{ py: 6, px: 3, textAlign: 'center', backgroundColor:'#f9f9f9' }}>
            <Typography variant="h4"  component="h2" gutterBottom>
                Why Choose Us?
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 4 }}>
            Explore our features designed to make your job search seamless.
            </Typography>
            <Grid2 container spacing={4} justifyContent="center">
                {features.map((feature, index) => (
                    <Grid2 item xs={12} sm={6} md={4} key={index}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            borderRadius: 2,
                            backgroundColor: "#fff",
                        }}
                        >
                            {feature.icon}
                            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color:"#333" }}>
                                {feature.title}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                {feature.description}
                             </Typography>
                        </Paper>
                </Grid2>
                ))}
            </Grid2>
            
        </Box>
    );
};

export default FeaturesSection; 