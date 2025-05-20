import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { EventNote as EventNoteIcon } from '@mui/icons-material';

const Interviews = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Interviews</Typography>
        <Button variant="contained" color="primary" startIcon={<EventNoteIcon />}>
          Schedule Interview
        </Button>
      </Box>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          No upcoming interviews scheduled
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Schedule an interview to see it listed here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Interviews;
