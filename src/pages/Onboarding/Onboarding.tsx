import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

const Onboarding = () => {
  console.count('Onboarding');
  return (
    <>
      <Helmet>
        <title> Onboarding | HR Bot </title>
      </Helmet>
      <Box>
        <Typography>Onboarding page</Typography>
      </Box>
    </>
  );
};

export default Onboarding;
