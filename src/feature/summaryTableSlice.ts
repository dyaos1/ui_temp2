import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SummaryTableDisplay } from '../data/interfaces/Displays';

// Define a type for the slice state
interface SummaryTableState {
  value: SummaryTableDisplay | null;
}

// Define the initial state using that type
const initialState: SummaryTableState = {
  value: null,
};

export const SummaryTableSlice = createSlice({
  name: 'summaryTable',
  initialState,
  reducers: {
    setSummaryTable: (
      state,
      action: PayloadAction<SummaryTableDisplay | null>,
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setSummaryTable } = SummaryTableSlice.actions;
export type { SummaryTableState };
export default SummaryTableSlice.reducer;
