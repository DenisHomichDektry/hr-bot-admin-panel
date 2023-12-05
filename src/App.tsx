import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { router } from '~/routes';
import { handleExpiredToken, init, selectReady } from '~/store/common';
import { useAppDispatch } from '~/store';
import { CustomSnackBar } from '~/components/molecules/CustomSnackBar';
import { FetchingProgress } from '~/components/atoms/FetchingProgress';
import { isTokenExist } from '~/utils';

function App() {
  const dispatch = useAppDispatch();

  const ready = useSelector(selectReady);

  useEffect(() => {
    // Resets the 'ready' value when the page becomes visible again
    // This is done to reevaluate the validity of the token
    // when the user switches back to the tab
    const eventListener = () => {
      if (document.visibilityState === 'visible') {
        if (!isTokenExist()) dispatch(handleExpiredToken());
      }
    };

    // runs init once in development mode
    const timeout = setTimeout(() => {
      dispatch(init());
      document.addEventListener('visibilitychange', eventListener);
    });

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('visibilitychange', eventListener);
    };
  }, []);

  return ready ? (
    <>
      <RouterProvider router={router}></RouterProvider>
      <CustomSnackBar />
      <FetchingProgress />
    </>
  ) : null;
}

export default App;
