import { configureStore } from '@reduxjs/toolkit';
import motherDataReducer from '../feature/motherDataSlice';
import summaryTableReducer from '../feature/summaryTableSlice';
import dashboardReducer from 'feature/dashboardSlice';
import sbjtListReducer from 'feature/sbjtListSlice';
import horizontalTableReducer from 'feature/horizontalTableSlice';

export const store = configureStore({
  reducer: {
    motherData: motherDataReducer,
    summaryTable: summaryTableReducer,
    dashboard: dashboardReducer,
    sbjtList: sbjtListReducer,
    horizontalTable: horizontalTableReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
