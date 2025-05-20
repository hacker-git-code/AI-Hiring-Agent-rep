import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async () => {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  }
);

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobData) => {
    const response = await axios.post(`${API_URL}/jobs`, jobData);
    return response.data;
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    selectedJob: null,
  },
  reducers: {
    selectJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { selectJob, clearSelectedJob } = jobsSlice.actions;
export default jobsSlice.reducer;
