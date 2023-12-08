import { FC, useEffect, useState } from 'react';
import { Container, Stack } from '@mui/material';

import { FAST_LOADING_TIMEOUT } from '~/constants';

import { GreyBox } from './styles.ts';

export const PageLoading: FC = () => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(true);
    }, FAST_LOADING_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return showLoading ? (
    <Container
      sx={{
        height: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <GreyBox
          sx={{
            width: '30%',
            height: '36px',
          }}
        />

        <GreyBox
          sx={{
            width: '15%',
            height: '36px',
          }}
        />
      </Stack>
      <Stack
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          height: '100%',
          flex: 1,
        }}>
        <GreyBox
          sx={{
            width: '100%',
            height: '100%',
            flex: 2,
          }}
        />
        <GreyBox
          sx={{
            width: '100%',
            height: '100%',
            flex: 2,
          }}
        />
        <GreyBox
          sx={{
            width: '100%',
            height: '100%',
            flex: 6,
          }}
        />
      </Stack>
    </Container>
  ) : null;
};
