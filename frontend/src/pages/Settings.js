import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  Switch, 
  FormControlLabel, 
  Divider,
  Grid,
  Avatar,
  IconButton
} from '@mui/material';
import { Settings as SettingsIcon, Save as SaveIcon, Edit as EditIcon } from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Hiring Manager',
    department: 'Human Resources',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
    newCandidates: true,
    interviewReminders: true,
    statusUpdates: true,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (event) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Save profile logic here
    console.log('Profile saved:', profileData);
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    // Save notification preferences logic here
    console.log('Notification preferences saved:', notifications);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <SettingsIcon sx={{ fontSize: 36, mr: 2 }} color="primary" />
        <Typography variant="h4">Settings</Typography>
      </Box>
      
      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Notifications" {...a11yProps(1)} />
          <Tab label="Team" {...a11yProps(2)} />
          <Tab label="Integrations" {...a11yProps(3)} />
          <Tab label="Billing" {...a11yProps(4)} />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          <form onSubmit={handleSaveProfile}>
            <Grid container spacing={3}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Box sx={{ position: 'relative', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      fontSize: 48,
                      bgcolor: 'primary.main',
                    }}
                  >
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'background.paper',
                      border: '2px solid',
                      borderColor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'background.default',
                      },
                    }}
                  >
                    <EditIcon />
                    <input hidden accept="image/*" type="file" />
                  </IconButton>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobTitle"
                  value={profileData.jobTitle}
                  onChange={handleProfileChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={profileData.department}
                  onChange={handleProfileChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  sx={{ mt: 2 }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <form onSubmit={handleSaveNotifications}>
            <Typography variant="h6" gutterBottom>
              Email Notifications
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.email}
                  onChange={handleNotificationChange}
                  name="email"
                  color="primary"
                />
              }
              label="Enable email notifications"
              sx={{ mb: 2 }}
            />
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              In-App Notifications
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.inApp}
                  onChange={handleNotificationChange}
                  name="inApp"
                  color="primary"
                />
              }
              label="Enable in-app notifications"
              sx={{ mb: 2 }}
            />
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            
            <Box sx={{ pl: 2, mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.newCandidates}
                    onChange={handleNotificationChange}
                    name="newCandidates"
                    color="primary"
                    disabled={!notifications.email && !notifications.inApp}
                  />
                }
                label="New candidate applications"
                sx={{ display: 'block', mb: 1 }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.interviewReminders}
                    onChange={handleNotificationChange}
                    name="interviewReminders"
                    color="primary"
                    disabled={!notifications.email && !notifications.inApp}
                  />
                }
                label="Interview reminders"
                sx={{ display: 'block', mb: 1 }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.statusUpdates}
                    onChange={handleNotificationChange}
                    name="statusUpdates"
                    color="primary"
                    disabled={!notifications.email && !notifications.inApp}
                  />
                }
                label="Application status updates"
                sx={{ display: 'block' }}
              />
            </Box>
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              sx={{ mt: 2 }}
            >
              Save Notification Preferences
            </Button>
          </form>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Team Management
          </Typography>
          <Typography color="textSecondary" paragraph>
            Manage your team members and their permissions here.
          </Typography>
          <Button variant="outlined" color="primary">
            Invite Team Member
          </Button>
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Integrations
          </Typography>
          <Typography color="textSecondary" paragraph>
            Connect with other tools you use.
          </Typography>
          <Button variant="outlined" color="primary">
            View Available Integrations
          </Button>
        </TabPanel>
        
        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" gutterBottom>
            Billing & Subscription
          </Typography>
          <Typography color="textSecondary" paragraph>
            Manage your subscription and billing information.
          </Typography>
          <Button variant="outlined" color="primary">
            View Billing Details
          </Button>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Settings;
