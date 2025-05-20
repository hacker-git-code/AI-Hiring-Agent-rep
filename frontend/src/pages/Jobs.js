import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterListIcon,
  WorkOutline as WorkOutlineIcon,
  LocationOnOutlined as LocationIcon,
  BusinessOutlined as BusinessIcon,
  AccessTimeOutlined as TimeIcon,
} from '@mui/icons-material';
import { fetchJobs, createJob, deleteJob } from '../features/jobs/jobsSlice';

const jobTypes = {
  'Full-time': { color: 'primary', icon: <WorkOutlineIcon fontSize="small" /> },
  'Part-time': { color: 'secondary', icon: <WorkOutlineIcon fontSize="small" /> },
  'Contract': { color: 'success', icon: <WorkOutlineIcon fontSize="small" /> },
  'Internship': { color: 'info', icon: <WorkOutlineIcon fontSize="small" /> },
  'Temporary': { color: 'warning', icon: <WorkOutlineIcon fontSize="small" /> },
};

const Jobs = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { items: jobs, status } = useSelector((state) => state.jobs);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredJobs = jobs.filter((job) =>
    Object.values(job).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleOpenDialog = (job = null) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };

  const handleMenuOpen = (event, jobId) => {
    setAnchorEl(event.currentTarget);
    setSelectedJobId(jobId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedJobId(null);
  };

  const handleDeleteJob = () => {
    if (selectedJobId) {
      dispatch(deleteJob(selectedJobId));
    }
    handleMenuClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const jobData = {
      title: formData.get('title'),
      department: formData.get('department'),
      location: formData.get('location'),
      type: formData.get('type'),
      description: formData.get('description'),
      requirements: formData.get('requirements').split('\n'),
      status: formData.get('status'),
    };

    if (selectedJob) {
      // Update existing job
      // dispatch(updateJob({ id: selectedJob.id, ...jobData }));
    } else {
      // Create new job
      dispatch(createJob(jobData));
    }
    
    handleCloseDialog();
  };

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Job Openings</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Post New Job
        </Button>
      </Box>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              size="small"
              placeholder="Search jobs..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1, mr: 2 }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
            >
              Filters
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {filteredJobs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((job) => (
                <Grid item xs={12} key={job.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between">
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {job.title}
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
                            <Chip
                              icon={<BusinessIcon />}
                              label={job.department}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              icon={<LocationIcon />}
                              label={job.location}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              icon={jobTypes[job.type]?.icon || <WorkOutlineIcon fontSize="small" />}
                              label={job.type}
                              color={jobTypes[job.type]?.color || 'default'}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              icon={<TimeIcon />}
                              label={new Date(job.postedDate).toLocaleDateString()}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                          <Typography variant="body2" color="textSecondary" paragraph>
                            {job.description.length > 200
                              ? `${job.description.substring(0, 200)}...`
                              : job.description}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, job.id)}
                            size="small"
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleOpenDialog(job)}
                          sx={{ mr: 1 }}
                        >
                          View Details
                        </Button>
                        <Button variant="outlined" size="small">
                          View Candidates
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredJobs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>

      {/* Job Details/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {selectedJob ? 'Edit Job Posting' : 'Create New Job Posting'}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="title"
                  margin="normal"
                  required
                  defaultValue={selectedJob?.title || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  margin="normal"
                  required
                  defaultValue={selectedJob?.department || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  margin="normal"
                  required
                  defaultValue={selectedJob?.location || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Job Type"
                  name="type"
                  margin="normal"
                  required
                  SelectProps={{ native: true }}
                  defaultValue={selectedJob?.type || 'Full-time'}
                >
                  {Object.keys(jobTypes).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  name="status"
                  margin="normal"
                  required
                  SelectProps={{ native: true }}
                  defaultValue={selectedJob?.status || 'Open'}
                >
                  <option value="Open">Open</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Closed">Closed</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Description"
                  name="description"
                  margin="normal"
                  multiline
                  rows={4}
                  required
                  defaultValue={selectedJob?.description || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Requirements (one per line)"
                  name="requirements"
                  margin="normal"
                  multiline
                  rows={4}
                  required
                  defaultValue={selectedJob?.requirements?.join('\n') || ''}
                  helperText="Enter each requirement on a new line"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedJob ? 'Update' : 'Create'} Job
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Job Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          const job = jobs.find(j => j.id === selectedJobId);
          if (job) {
            handleOpenDialog(job);
          }
          handleMenuClose();
        }}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteJob}>
          <DeleteIcon fontSize="small" color="error" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <WorkOutlineIcon fontSize="small" sx={{ mr: 1 }} />
          View Candidates
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Jobs;
