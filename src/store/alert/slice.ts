import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '~/store';

import { sliceName } from './actionType.ts';
import { IAlert } from './types.ts';

export interface IAlertState {
  // current message to display
  alert: IAlert | null;
  queue: IAlert[];
}

const initialState: IAlertState = {
  alert: null,
  queue: [],
};
export const alertSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetAlert: (state) => {
      const message = state.queue.shift();
      state.alert = message || null;
    },
    scheduleAlert: (state, action: PayloadAction<string>) => {
      if (state.alert?.id) {
        state.queue.push({
          id: performance.now() + '',
          message: action.payload,
        });
      } else {
        state.alert = {
          id: performance.now() + '',
          message: action.payload,
        };
      }
    },
  },
  extraReducers: undefined,
});

export const { resetAlert, scheduleAlert } = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alert.alert;

export const alertReducer = alertSlice.reducer;
