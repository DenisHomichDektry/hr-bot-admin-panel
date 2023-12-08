import React, { useEffect, memo } from 'react';
import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';

import { IOnboardingStepUpsert } from '~/store/api';

interface ICreateOrEditStepDialogProps {
  step?: IOnboardingStepUpsert | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (step: IOnboardingStepUpsert) => void;
  loading?: boolean;
  disableConfirm?: boolean;
}

const validationSchema = yup.object({
  title: yup.string().required('Title is required').max(512, 'Title should not exceed 512 characters'),
  link: yup
    .string()
    .required('Link is required')
    .max(6000, 'Link should not exceed 6000 characters')
    .url('Invalid link format'),
  description: yup
    .string()
    .required('Description is required')
    .max(1560, 'Description should not exceed 1560 characters'),
});

export const CreateOrEditStepDialog: FC<ICreateOrEditStepDialogProps> = memo((props) => {
  const { open, onClose, onConfirm, step, disableConfirm, loading } = props;

  const formik = useFormik({
    initialValues: {
      title: step?.title || '',
      link: step?.link || '',
      description: step?.description || '',
    },
    validationSchema,
    onSubmit: (values) => {
      onConfirm(step ? { ...step, ...values } : { ...values, order: 0 });
    },
  });

  useEffect(() => {
    if (step && open) {
      formik.resetForm({
        values: {
          title: step?.title || '',
          link: step?.link || '',
          description: step?.description || '',
        },
      });
    }
    return () => {
      formik.resetForm();
    };
  }, [step, open]);

  return (
    <Dialog fullWidth maxWidth={'xs'} open={open} onClose={onClose}>
      <DialogTitle>{step ? 'Edit step' : 'New step'}</DialogTitle>
      <DialogContent>
        <Stack id="onboarding-form" component="form" gap={2} mb={2} py={1} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            {...formik.getFieldProps('title')}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            label="Link"
            {...formik.getFieldProps('link')}
            error={formik.touched.link && Boolean(formik.errors.link)}
            helperText={formik.touched.link && formik.errors.link}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            maxRows={10}
            {...formik.getFieldProps('description')}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </Stack>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton
            type="submit"
            form="onboarding-form"
            disabled={disableConfirm || !formik.dirty || !formik.isValid}
            loading={loading}
            variant="contained">
            {step ? 'Edit' : 'Create'}
          </LoadingButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
});
