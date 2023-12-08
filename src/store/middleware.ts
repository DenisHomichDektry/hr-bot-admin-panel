import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { handleExpiredToken } from '~/store/common';
import { AppDispatch } from '~/store/store.ts';

export const rtkQueryErrorLogger: Middleware =
  ({ dispatch }: MiddlewareAPI<AppDispatch>) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action) && (action.payload as any)?.status === 403) {
      dispatch(handleExpiredToken());
    }

    return next(action);
  };
