import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const AdminHome = () => {
  return (
   
      <Box >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: '#2E3B55' }} 
        >
          Welcome to EMedicine
        </Typography>
        <Typography
          variant="body1"
      
          sx={{ color: '#5C6C7C' }}
        >
          At EMedicine, we are committed to your health and well-being. Here’s what we offer:
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: '#2E3B55' }} 
        >
          Wide Range of Medicines
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#5C6C7C' }} 
        >
          From prescription drugs to over-the-counter remedies, we’ve got you covered.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: '#2E3B55' }} 
        >
          Quality You Can Trust
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#5C6C7C' }}
        >
          All our products meet the highest safety and efficacy standards.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: '#2E3B55' }} 
        >
          Affordable Pricing
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#5C6C7C' }} 
        >
          Access essential medications without breaking the bank.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: '#2E3B55' }}
        >
          Expert Advice
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#5C6C7C' }} 
        >
          Our knowledgeable staff is here to answer your questions and guide you.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: '#2E3B55' }} 
        >
          Convenient Shopping
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#5C6C7C' }} 
        >
          Order online or visit us in-store for a seamless experience.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#5C6C7C' }} 
        >
          Your health is our priority! Explore our collection and feel free to reach out for personalized assistance.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: '#2E3B55' }} 
        >
          Stay healthy, stay happy!
        </Typography>
      </Box>
  
  );
}

export default AdminHome;
