import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ErrorBoundary } from 'react-error-boundary';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Jobs from './pages/Jobs';
import Interviews from './pages/Interviews';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { Provider } from 'react-redux';
import store from './app/store';
import theme from './theme';

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h5" color="error" gutterBottom>
        Something went wrong
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        {error.message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={resetErrorBoundary}
      >
        Try again
      </Button>
    </Box>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Box sx={{ display: 'flex' }}>
              <DashboardLayout>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/candidates" element={<Candidates />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/interviews" element={<Interviews />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<div>Page not found</div>} />
                  </Routes>
                </ErrorBoundary>
              </DashboardLayout>
            </Box>
          </Router>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
