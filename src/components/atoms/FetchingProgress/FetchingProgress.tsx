import { FC, useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectIsFetching } from '~/store/common';

export const FetchingProgress: FC = () => {
  const isFetching = useSelector(selectIsFetching);
  // TODO:
  // add logic to hide progress bar when session is expired
  // check is user is logged in

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    if (isFetching) {
      setDisplay(true);
    } else {
      timeoutId = setTimeout(() => {
        setDisplay(false);
      }, 250);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isFetching]);

  return display ? (
    <LinearProgress
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
    />
  ) : null;
};
