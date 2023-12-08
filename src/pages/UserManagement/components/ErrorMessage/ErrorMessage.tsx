import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface IErrorMessageProps {
  errors: Array<FetchBaseQueryError | SerializedError | undefined>;
}
export const ErrorMessage: FC<IErrorMessageProps> = ({ errors }) => {
  return (
    <Stack alignItems="center" gap={4}>
      <Typography color="error">Something went wrong</Typography>
      {errors.map((error) =>
        error ? (
          <Stack alignItems="center">
            {'data' in error
              ? Object.entries(error.data as any).map(([key, value]) => (
                  <Typography key={key}>{key + ': ' + value}</Typography>
                ))
              : null}
          </Stack>
        ) : null,
      )}
    </Stack>
  );
};
