import { createAsyncThunk } from '@reduxjs/toolkit';

import { router } from '~/routes';
import { MESSAGES, publicRoutes, ROUTES } from '~/constants';
import { getToken, isTokenExist, isTokenExpired } from '~/utils/token.ts';
import { AppThunk } from '~/store';
import { scheduleAlert } from '~/store/alert';

import { initType } from './actionType.ts';

export const init = createAsyncThunk(initType, async () => {
  if (publicRoutes.includes(router.state.location.pathname as ROUTES)) {
    return true;
  }

  const token = getToken();
  const redirect = localStorage.getItem('redirect');

  // if there is no valid token, save current route and redirect to login
  if (!token || isTokenExpired(token)) {
    localStorage.setItem('redirect', window.location.pathname);
    router.navigate(ROUTES.LOGIN);
    localStorage.removeItem('token');
  }

  // if there is a valid token, redirect to saved route if exists
  if (redirect && token) {
    localStorage.removeItem('redirect');
    router.navigate(redirect);
  }

  if (token && router.state.location.pathname === ROUTES.LOGIN) {
    router.navigate(ROUTES.DASHBOARD);
  }

  return true;
});

export const handleExpiredToken = (): AppThunk => (dispatch, getState) => {
  dispatch(scheduleAlert(MESSAGES.SESSION_EXPIRED));
  localStorage.setItem('redirect', window.location.pathname);
  localStorage.removeItem('token');
  router.navigate(ROUTES.LOGIN);
};
