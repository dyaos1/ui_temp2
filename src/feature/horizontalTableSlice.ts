import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HTDisplay } from '../data/interfaces/Displays';

interface SbjtListState {
  value: HTDisplay | null;
}

// Define the initial state using that type
const initialState: SbjtListState = {
  value: null,
};

export const horizontalTableSlice = createSlice({
  name: 'horizontalTable',
  initialState,
  reducers: {
    setHorizontalTable: (state, action: PayloadAction<HTDisplay | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setHorizontalTable } = horizontalTableSlice.actions;
export type { SbjtListState };
export default horizontalTableSlice.reducer;
