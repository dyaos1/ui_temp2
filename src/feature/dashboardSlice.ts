import { createSlice } from '@reduxjs/toolkit';
import { DashboardDisplay } from 'data/interfaces/Displays';

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    value: null as DashboardDisplay | null,
  },
  reducers: {
    getDashboard: (state) => {
      state.value;
    },
    setDashboard: (state, action) => {
      state.value = action.payload;
    },
    sumChanged: (
      state,
      action: {
        payload: {
          idx: number;
          initialOrContinous: 'initial' | 'continuous';
          value: string;
        };
      },
    ) => {
      const { idx, initialOrContinous, value } = action.payload;
      if ((state.value ??= null) && (state.value.brdn_BSNS ??= null)) {
        if (initialOrContinous === 'initial') {
          state.value.brdn_BSNS[idx].limitIn.initial.sum = Number(value);
          state.value.brdn_BSNS[idx].limitIn.initial.unitCost = state.value
            .brdn_BSNS[idx].limitIn.initial.count
            ? ((Number(value) /
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                state.value.brdn_BSNS[idx].limitIn.initial.count!) *
                12) /
              9
            : 0;
        } else if (initialOrContinous === 'continuous') {
          state.value.brdn_BSNS[idx].limitIn.continuous.sum = Number(value);
          state.value.brdn_BSNS[idx].limitIn.continuous.unitCost = state.value
            .brdn_BSNS[idx].limitIn.continuous.count
            ? Number(value) /
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              state.value.brdn_BSNS[idx].limitIn.continuous.count!
            : 0;
        }
      }
    },
    unitCostChanged: (
      state,
      action: {
        payload: {
          idx: number;
          initialOrContinous: 'initial' | 'continuous';
          value: string;
        };
      },
    ) => {
      const { idx, initialOrContinous, value } = action.payload;
      if ((state.value ??= null) && (state.value.brdn_BSNS ??= null)) {
        if (initialOrContinous === 'initial') {
          state.value.brdn_BSNS[idx].limitIn.initial.unitCost = Number(value);
          state.value.brdn_BSNS[idx].limitIn.initial.sum = state.value
            .brdn_BSNS[idx].limitIn.initial.count
            ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              (state.value.brdn_BSNS![idx].limitIn.initial.count! *
                Number(value) *
                9) /
              12
            : 0;
        } else if (initialOrContinous === 'continuous') {
          state.value.brdn_BSNS[idx].limitIn.continuous.unitCost =
            Number(value);
          state.value.brdn_BSNS[idx].limitIn.continuous.sum = state.value
            .brdn_BSNS[idx].limitIn.continuous.count
            ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              state.value.brdn_BSNS[idx].limitIn.initial.count! * Number(value)
            : 0;
        }
      }
    },
    countChanged: (
      state,
      action: {
        payload: {
          idx: number;
          initialOrContinous: 'initial' | 'continuous';
          value: string;
        };
      },
    ) => {
      const { idx, initialOrContinous, value } = action.payload;
      if ((state.value ??= null) && (state.value.brdn_BSNS ??= null)) {
        if (initialOrContinous === 'initial') {
          state.value.brdn_BSNS[idx].limitIn.initial.count = Number(value);
          state.value.brdn_BSNS[idx].limitIn.initial.unitCost = state.value
            .brdn_BSNS[idx].limitIn.initial.sum
            ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              ((state.value.brdn_BSNS[idx].limitIn.initial.sum! /
                Number(value)) *
                12) /
              9
            : 0;
        } else if (initialOrContinous === 'continuous') {
          state.value.brdn_BSNS[idx].limitIn.continuous.count = Number(value);
          state.value.brdn_BSNS[idx].limitIn.continuous.unitCost = state.value
            .brdn_BSNS[idx].limitIn.continuous.sum
            ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              state.value.brdn_BSNS[idx].limitIn.initial.sum! / Number(value)
            : 0;
        }
      }
    },
    demandChanged: (state, action) => {
      if ((state.value ??= null) && (state.value.brdn_BSNS ??= null)) {
        state.value.ptc_BSNS.limitIn.amount = Number(action.payload);
        state.value.brdn_BSNS.map(
          (e) =>
            (e.limitIn.amount = e.limitIn.weight
              ? e.limitIn.weight * Number(action.payload)
              : 0),
        );
      }
    },
  },
});

export const {
  getDashboard,
  setDashboard,
  countChanged,
  sumChanged,
  unitCostChanged,
  demandChanged,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
