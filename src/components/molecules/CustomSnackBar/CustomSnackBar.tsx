import { FC, MouseEventHandler, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Button, Snackbar } from '@mui/material';

import { Iconify } from '~/components/atoms/Iconify';
import { resetAlert, selectAlert } from '~/store/alert';
import { useAppDispatch } from '~/store';

export const CustomSnackBar: FC = () => {
  const dispatch = useAppDispatch();

  const alert = useSelector(selectAlert);

  const handleSnackbarClose = (_: Event | SyntheticEvent<unknown, Event>, reason?: string) => {
    if (reason === 'timeout') dispatch(resetAlert());
    if (reason === undefined) dispatch(resetAlert()); // case click on close(x) button
  };

  const hideDuration = alert ? (alert.message.length > 50 ? alert.message.length * 50 : alert.message.length * 100) : 0;

  console.count('alert');

  return (
    <Snackbar
      key={alert?.id}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={!!alert}
      onClose={handleSnackbarClose}
      autoHideDuration={hideDuration}
      resumeHideDuration={hideDuration}>
      <Alert
        severity="error"
        sx={{
          // TODO: move to overrides
          backgroundColor: 'rgb(255, 233, 213)',
        }}
        action={
          <Button onClick={handleSnackbarClose as MouseEventHandler<unknown>}>
            <Iconify icon="iconamoon:close-bold" />
          </Button>
        }>
        {alert?.message}
      </Alert>
    </Snackbar>
  );
};
