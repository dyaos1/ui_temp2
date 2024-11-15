import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SbjtListDisplay } from '../data/interfaces/Displays';

interface SbjtListState {
  value: SbjtListDisplay[] | null;
}

// Define the initial state using that type
const initialState: SbjtListState = {
  value: null,
};

export const sbjtListSlice = createSlice({
  name: 'sbjtList',
  initialState,
  reducers: {
    setSbjtList: (state, action: PayloadAction<SbjtListDisplay[] | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setSbjtList } = sbjtListSlice.actions;
export type { SbjtListState };
export default sbjtListSlice.reducer;
