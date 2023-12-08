import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '~/store';

import { sliceName } from './actionType.ts';
import { init } from './thunk.ts';

export interface ICommonState {
  ready: boolean;
  isFetching: boolean;
  isPageLoading: boolean; // helps control suspense behavior
}

const initialState: ICommonState = {
  ready: false,
  isFetching: false,
  isPageLoading: true,
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
    updateIsPageLoading: (state, action: PayloadAction<boolean>) => {
      state.isPageLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.ready = action.payload;
    });
  },
});

export const { resetReady, updateIsFetching, updateIsPageLoading } = commonSlice.actions;

export const selectReady = (state: RootState) => state.common.ready;
export const selectIsFetching = (state: RootState) => state.common.isFetching;
export const selectIsPageLoading = (state: RootState) => state.common.isPageLoading;

export const commonReducer = commonSlice.reducer;
