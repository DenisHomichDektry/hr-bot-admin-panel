import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const UserManagement = () => {
  return (
    <>
      <Helmet>
        <title> User Management | HR Bot </title>
      </Helmet>
      <Box>
        <Typography>User Management page</Typography>
      </Box>
    </>
  );
};

export default UserManagement;
