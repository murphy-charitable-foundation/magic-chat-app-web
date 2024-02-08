import React from 'react';
import { Box, Typography, Button, IconButton, TextareaAutosize } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { styled } from '@mui/system';

const CustomBox = styled(Box)(({ theme }) => ({
  background: '#f0faff', // Light blue background
  maxWidth: '800px',
  margin: 'auto',
  padding: '20px',
  boxShadow: '0px 8px 24px rgba(0,0,0,0.1)',
  borderRadius: '25px',
  border: '2px solid #dbefff', // Lighter blue border
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 12px 36px rgba(0,0,0,0.15)',
  }
}));

const CustomTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  background: '#ffffff', // Pure white background
  border: '2px solid #dbefff', // Light blue border to match the box
  fontSize: '18px',
  fontFamily: "'Times new roman', cursive",
  marginTop: '20px',
  marginBottom: '20px',
  padding: '15px',
  borderRadius: '15px',
  boxShadow: 'inset 0px 4px 4px rgba(0,0,0,0.05)',
  '&:focus': {
    outline: 'none',
    borderColor: '#89c9b8', // Slight hint of green for focus
  }
}));

const ActionButton = styled(Button)({
  borderRadius: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  textTransform: 'none',
  boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
  backgroundColor: '#007bff', // Blue button
  color: '#ffffff', // White text
  '&:hover': {
    backgroundColor: '#0056b3', // Darker blue on hover
    boxShadow: '0px 6px 14px rgba(0,0,0,0.2)',
  }
});

const IconButtonStyled = styled(IconButton)({
  borderRadius: '50%',
  boxShadow: '0px 3px 8px rgba(0,0,0,0.1)',
  color: '#007bff', // Blue icon
  '&:hover': {
    backgroundColor: '#e3f2fd', // Very light blue background on hover
    boxShadow: '0px 5px 15px rgba(0,0,0,0.2)',
  }
});

const Messages = () => {
  return (
    <CustomBox>
      <Typography variant="h5" gutterBottom component="div" style={{ fontFamily: "'Tangerine', cursive", fontSize: '34px', textAlign: 'center', color: '#007bff' }}>
        Your Letter to the Pen Pal
        <Typography variant="subtitle2" component="span" style={{ display: 'block', fontFamily: "'Open Sans', sans-serif", fontSize: '18px', marginTop: '5px', color: '#89c9b8' }}>
          Get in touch with Mia Dupont!
        </Typography>
      </Typography>
      <CustomTextarea minRows={6} placeholder="Write your message here..." />
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <IconButtonStyled aria-label="attach file">
          <AttachFileIcon />
        </IconButtonStyled>
        <ActionButton endIcon={<SendIcon />}>
          Send
        </ActionButton>
      </Box>
    </CustomBox>
  );
};

export default Messages;