import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  People as PeopleIcon,
  Work as WorkIcon,
  EventNote as EventNoteIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { fetchCandidates } from '../features/candidates/candidatesSlice';
import { fetchJobs } from '../features/jobs/jobsSlice';
import { fetchInterviews } from '../features/interviews/interviewsSlice';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="subtitle2">
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        <Box
          sx={{
            color: color,
            backgroundColor: `${color}20`,
            borderRadius: '50%',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {React.cloneElement(icon, { fontSize: 'large' })}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: candidates, status: candidatesStatus } = useSelector((state) => state.candidates);
  const { items: jobs, status: jobsStatus } = useSelector((state) => state.jobs);
  const { items: interviews, status: interviewsStatus } = useSelector((state) => state.interviews);

  useEffect(() => {
    if (candidatesStatus === 'idle') {
      dispatch(fetchCandidates());
    }
    if (jobsStatus === 'idle') {
      dispatch(fetchJobs());
    }
    if (interviewsStatus === 'idle') {
      dispatch(fetchInterviews());
    }
  }, [dispatch, candidatesStatus, jobsStatus, interviewsStatus]);

  const upcomingInterviews = interviews.filter(
    (interview) => new Date(interview.scheduledTime) > new Date()
  ).length;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      {candidatesStatus === 'loading' || jobsStatus === 'loading' || interviewsStatus === 'loading' ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Candidates"
              value={candidates.length}
              icon={<PeopleIcon />}
              color="#3f51b5"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Open Positions"
              value={jobs.length}
              icon={<WorkIcon />}
              color="#4caf50"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Upcoming Interviews"
              value={upcomingInterviews}
              icon={<EventNoteIcon />}
              color="#ff9800"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Hiring Rate"
              value={`${Math.round((candidates.filter(c => c.status === 'Hired').length / candidates.length) * 100) || 0}%`}
              icon={<AssessmentIcon />}
              color="#e91e63"
            />
          </Grid>

          {/* Recent Jobs */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Job Openings
              </Typography>
              {jobs.slice(0, 5).map((job) => (
                <Box key={job.id} sx={{ mb: 2, p: 1, '&:hover': { bgcolor: 'action.hover' } }}>
                  <Typography variant="subtitle1">{job.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {job.department} • {job.location} • {job.type}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Recent Candidates */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Candidates
              </Typography>
              {candidates.slice(0, 5).map((candidate) => (
                <Box key={candidate.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, '&:hover': { bgcolor: 'action.hover' } }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', mr: 2 }}>
                    {candidate.name.charAt(0)}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1">{candidate.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {candidate.position} • {candidate.status}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
