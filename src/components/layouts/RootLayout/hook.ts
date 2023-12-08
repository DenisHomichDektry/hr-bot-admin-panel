import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectIsPageLoading } from '~/store/common';
import { FAST_LOADING_TIMEOUT, SLOW_LOADING_TIMEOUT } from '~/constants';

// React.Suspense is used to signal when page is loaded
// this hook is used to control PageLoading behavior
// ideally, we want to show the loading screen for at least 700ms
// in case the page loads under 100ms, loading screen will not be shown at all
export const useDisplayChildren = (): boolean => {
  const isPageLoading = useSelector(selectIsPageLoading);

  const [displayChildren, setDisplayChildren] = useState(false);
  const [start, setStart] = useState(0);

  useEffect(() => {
    let timeoutId: number;
    if (isPageLoading) {
      // this timeout is to prevent the loading screen from flashing when the page loads too quickly
      timeoutId = setTimeout(() => {
        if (start === 0) setStart(performance.now());
        if (displayChildren) setDisplayChildren(false);
      }, FAST_LOADING_TIMEOUT);
    } else {
      const timeSinceStart = performance.now() - start;
      setTimeout(
        () => {
          setDisplayChildren(true);
          setStart(0);
        },
        Math.max(0, SLOW_LOADING_TIMEOUT - timeSinceStart),
      );
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPageLoading]);

  return displayChildren;
};
