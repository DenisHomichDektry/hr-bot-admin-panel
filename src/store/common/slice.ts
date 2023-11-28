import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '~/store';

import { sliceName } from './actionType.ts';
import { init } from './thunk.ts';

export interface ICommonState {
  ready: boolean;
  isFetching: boolean;
}

const initialState: ICommonState = {
  ready: false,
  isFetching: false,
};
export const commonSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetReady: (state) => {
      state.ready = false;
    },
    updateIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.ready = action.payload;
    });
  },
});

export const { resetReady, updateIsFetching } = commonSlice.actions;

export const selectReady = (state: RootState) => state.common.ready;
export const selectIsFetching = (state: RootState) => state.common.isFetching;

export const commonReducer = commonSlice.reducer;
