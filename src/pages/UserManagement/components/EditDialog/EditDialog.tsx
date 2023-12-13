import { FC, ReactNode, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { IRole, IUpdateUser, IUser } from '~/store/api';
import { CustomSelect } from '~/components/molecules/CustomSelect';
import { useResponsive } from '~/hooks';

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required').max(512, 'First name must be at most 512 characters'),
  lastName: yup.string().required('Last name is required').max(512, 'Last name must be at most 512 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  position: yup.string().max(512, 'Position must be at most 512 characters'),
  roleId: yup.string().required('Role is required'),
});

interface IEditDialogProps {
  open: boolean;
  roles?: IRole[];
  user: IUser | null;
  onClose: () => void;
  onSave: (user: IUpdateUser) => void;
  loading?: boolean;
}

export const EditDialog: FC<IEditDialogProps> = (props) => {
  const { open, onClose, onSave, loading, roles, user } = props;
  const smUp = useResponsive({ query: 'up', start: 'sm' });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      position: user?.position || '',
      roleId: user?.role.id || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (user) {
        onSave({
          id: user.id,
          ...values,
        });
      }
    },
  });

  useEffect(() => {
    if (user && open) {
      formik.resetForm({
        values: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email || '',
          position: user.position || '',
          roleId: user.role.id,
        },
      });
    }
  }, [user, open]);

  return (
    <Dialog fullWidth={!smUp} open={open} onClose={onClose}>
      <DialogTitle>Edit user</DialogTitle>
      <DialogContent>
        <Stack
          id="user-edit-form"
          component="form"
          onSubmit={formik.handleSubmit}
          spacing={4}
          sx={{
            width: smUp ? '450px' : '100%',
            padding: '10px 0',
          }}>
          <Stack direction={smUp ? 'row' : 'column'} spacing={4} justifyContent="space-between">
            <TextField
              fullWidth
              label="First name"
              {...formik.getFieldProps('firstName')}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              label="Last name"
              {...formik.getFieldProps('lastName')}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Stack>
          <TextField
            label="Email"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Position"
            {...formik.getFieldProps('position')}
            error={formik.touched.position && Boolean(formik.errors.position)}
            helperText={formik.touched.position && formik.errors.position}
          />
          <CustomSelect
            label="Role"
            options={roles || []}
            {...formik.getFieldProps('roleId')}
            error={formik.touched.roleId && Boolean(formik.errors.roleId)}
            helperText={formik.touched.roleId && formik.errors.roleId}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          disabled={!formik.dirty || !formik.isValid}
          form="user-edit-form"
          loading={loading}
          variant="contained"
          type="submit">
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
