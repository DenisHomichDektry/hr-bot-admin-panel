import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  console.count('Dashboard');
  return (
    <>
      <Helmet>
        <title> Dashboard | HR Bot </title>
      </Helmet>
      <Box>
        <Typography>Dashboard page</Typography>
      </Box>
    </>
  );
};

export default Dashboard;
