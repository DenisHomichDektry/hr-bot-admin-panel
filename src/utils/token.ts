import { jwtDecode } from 'jwt-decode';

export const getToken = (): string | null => {
  let token = localStorage.getItem('token');

  if (!token) {
    return getTokenFromUrl();
  }

  return token;
};

const getTokenFromUrl = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('jwt');

  if (token) {
    localStorage.setItem('token', token);
    window.history.replaceState(null, '', window.location.pathname);
    return token;
  }

  return null;
};

export const isTokenExpired = (token: string): boolean => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken?.exp ? decodedToken?.exp < currentTime : true;
};

export const isTokenExist = (): boolean => {
  const token = getToken();
  if (token) {
    return !isTokenExpired(token);
  }
  return false;
};
