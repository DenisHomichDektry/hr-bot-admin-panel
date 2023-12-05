import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { logger } from 'redux-logger';

import { api } from '~/store/api';

import { commonReducer } from './common';
import { alertReducer } from './alert';
import { rtkQueryErrorLogger } from './middleware.ts';

const middlewares = [api.middleware, rtkQueryErrorLogger];

if (import.meta.env.MODE === 'development') {
  // middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    common: commonReducer,
    alert: alertReducer,
    [api.reducerPath]: api.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
