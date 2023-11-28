import { Box, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Helmet } from 'react-helmet-async';
import { useFormik } from 'formik';

import { useGetTestQuery, useUpdateTestMutation } from '~/store/api.ts';
import { useIsFetching } from '~/hooks';

const UserManagement = () => {
  const { data, isError, isLoading, isFetching } = useGetTestQuery(1);
  const [updateMessage, { isLoading: isMessageUpdating }] = useUpdateTestMutation();
  useIsFetching(isFetching);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      updateMessage({ id: 1, message: values.message });
    },
  });

  return (
    <>
      <Helmet>
        <title> User Management | HR Bot </title>
      </Helmet>
      <Box>
        <Typography>User Management page</Typography>
        {isError ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.message}</h3>
            <Stack sx={{ p: 10 }} component="form" onSubmit={formik.handleSubmit}>
              <TextField name="message" value={formik.values.message} onChange={formik.handleChange} />
              <LoadingButton disabled={isMessageUpdating || isFetching} loading={isMessageUpdating} type="submit">
                Update message
              </LoadingButton>
            </Stack>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default UserManagement;
