import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const fetchInterviews = createAsyncThunk(
  'interviews/fetchInterviews',
  async () => {
    const response = await axios.get(`${API_URL}/interviews`);
    return response.data;
  }
);

export const scheduleInterview = createAsyncThunk(
  'interviews/scheduleInterview',
  async (interviewData) => {
    const response = await axios.post(`${API_URL}/interviews`, interviewData);
    return response.data;
  }
);

const interviewsSlice = createSlice({
  name: 'interviews',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    selectedInterview: null,
  },
  reducers: {
    selectInterview: (state, action) => {
      state.selectedInterview = action.payload;
    },
    clearSelectedInterview: (state) => {
      state.selectedInterview = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInterviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInterviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInterviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(scheduleInterview.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { selectInterview, clearSelectedInterview } = interviewsSlice.actions;
export default interviewsSlice.reducer;
