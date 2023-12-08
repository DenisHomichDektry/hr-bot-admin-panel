import { FC, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import { Iconify } from '~/components/atoms/Iconify';
import { IOnboardingStepUpsert, useOnboardingStepQuery, useUpsertOnboardingStepMutation } from '~/store/api';
import { useError } from '~/hooks';

import { CreateOrEditStepDialog } from '../';

export const Header: FC = () => {
  const { data, isLoading: isStepsLoading, isFetching, error: onboardingError } = useOnboardingStepQuery();
  const [upsertOnboardingStep, { isLoading, error: upsertError }] = useUpsertOnboardingStepMutation();
  useError(onboardingError, upsertError);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async (step: IOnboardingStepUpsert) => {
    if (!data) return;

    await upsertOnboardingStep([step, ...data.map((item) => ({ ...item, order: item.order + 1 }))]);
    handleClose();
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Onboarding</Typography>

        <Button
          disabled={isStepsLoading || isFetching}
          onClick={() => setOpen(true)}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}>
          New step
        </Button>
      </Stack>
      <CreateOrEditStepDialog open={open} loading={isLoading} onClose={handleClose} onConfirm={handleCreate} />
    </>
  );
};
