import { useEffect } from 'react';

import { useAppDispatch } from '~/store';
import { updateIsFetching } from '~/store/common';

export const useIsFetching = (...deps: boolean[]): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isFetching = deps.some((dep) => dep);
    dispatch(updateIsFetching(isFetching));
    return () => {
      dispatch(updateIsFetching(false));
    };
  }, deps);
};
