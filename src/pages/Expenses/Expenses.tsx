import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { useUsersQuery } from '~/store/api';
import { useError } from '~/hooks';

const Expenses = () => {
  console.count('Expenses');
  // TODO: remove after demo
  const { error } = useUsersQuery({
    limit: -10,
    page: 0,
  });

  useError(error);

  return (
    <>
      <Helmet>
        <title> Expenses | HR Bot </title>
      </Helmet>
      <Box>
        <Typography>Expenses page</Typography>
      </Box>
    </>
  );
};

export default Expenses;
