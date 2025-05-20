import { configureStore } from '@reduxjs/toolkit';
import candidatesReducer from '../features/candidates/candidatesSlice';
import jobsReducer from '../features/jobs/jobsSlice';
import interviewsReducer from '../features/interviews/interviewsSlice';

export default configureStore({
  reducer: {
    candidates: candidatesReducer,
    jobs: jobsReducer,
    interviews: interviewsReducer,
  },
});
