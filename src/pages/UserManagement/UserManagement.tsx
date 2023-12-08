import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

import { Header, UserTable } from './components';

const UserManagement = () => {
  return (
    <>
      <Helmet>
        <title> User Management | HR Bot </title>
      </Helmet>
      <Container>
        <Header />
        <UserTable />
      </Container>
    </>
  );
};

export default UserManagement;
