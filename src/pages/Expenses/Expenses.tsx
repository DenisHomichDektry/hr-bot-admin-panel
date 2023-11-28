import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const Expenses = () => {
  console.count('Expenses');
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
