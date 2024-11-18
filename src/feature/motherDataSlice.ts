import { createSlice } from '@reduxjs/toolkit';
import DataClass from '../data/DataClass';

export const motherDataSlice = createSlice({
  name: 'motherData',
  initialState: {
    value: new DataClass(2024, 'B100009').motherData,
  },
  reducers: {
    getMotherData: (state) => {
      state.value;
    },
    setMotherData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getMotherData } = motherDataSlice.actions;
export default motherDataSlice.reducer;
