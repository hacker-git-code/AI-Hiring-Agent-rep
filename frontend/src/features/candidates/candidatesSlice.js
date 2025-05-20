import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const fetchCandidates = createAsyncThunk(
  'candidates/fetchCandidates',
  async () => {
    const response = await axios.get(`${API_URL}/candidates`);
    return response.data;
  }
);

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    selectedCandidate: null,
  },
  reducers: {
    selectCandidate: (state, action) => {
      state.selectedCandidate = action.payload;
    },
    clearSelectedCandidate: (state) => {
      state.selectedCandidate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { selectCandidate, clearSelectedCandidate } = candidatesSlice.actions;
export default candidatesSlice.reducer;
