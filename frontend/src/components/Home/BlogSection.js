import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid } from "@mui/material";

const blogs = [
  {
    image: require("../../images/Book&Glass.jpg"),
    title: "5 Resume Tips to Land Your Dream Job",
    description: "Learn how to craft a standout resume with these simple tips.",
    link: '/insights/resume-tips',
  },
  {
    image: require("../../images/Job_interview.jpg"),
    title: "Ace Your Job Interview",
    description: "Master your next interview with our expert advice.",
    link: "/insights/interview-guide",
  },
  {
    image: require("../../images/career_trends.jpg"),
    title: "Top Career Trends in 2025",
    description: "Stay ahead of the curve with the latest industry insights.",
    link: "/insights/career-trends",
  },
];

const BlogSection = () => {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Career Insights
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        Explore expert tips, guides, and industry insights to level up your career.
      </Typography>
      <Grid container spacing={3}>
        {blogs.map((blog, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: "100%", 
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 5,
              }}
            >
              <CardMedia
                component="img"
                image={blog.image}
                alt={blog.title}
                sx={{
                  height: 150, 
                  objectFit: "cover", 
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1, 
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  href={blog.link}
                  sx={{
                    backgroundColor:"#0000000",
                    color: "#fff",
                    ransition: "transform, box-shadow 0.5s ease-in",
                    "&:hover": {
                      backgroundColor: "#333",
                      color: "#fff",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                      transform: "scale(1.05)",
                      transitionDuration: "0.5s"
                    }
                  }}
                  >
                  Read More
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogSection;
