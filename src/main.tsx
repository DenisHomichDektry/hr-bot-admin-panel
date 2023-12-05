import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import 'simplebar-react/dist/simplebar.min.css';

import { store } from '~/store';

import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
);
