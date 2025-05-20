import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { Assessment as AssessmentIcon } from '@mui/icons-material';

const Analytics = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <AssessmentIcon sx={{ fontSize: 36, mr: 2 }} color="primary" />
        <Typography variant="h4">Analytics</Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Hiring Funnel
            </Typography>
            <Box sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
              <Typography>Hiring funnel visualization will be displayed here</Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Time to Hire
            </Typography>
            <Box sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
              <Typography>Time to hire metrics will be displayed here</Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Source of Hire
            </Typography>
            <Box sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
              <Typography>Source of hire analytics will be displayed here</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
