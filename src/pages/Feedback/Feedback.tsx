import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

import { Header, FeedbackTable } from './components';

const Feedback: FC = () => {
  return (
    <>
      <Helmet>
        <title> Feedback | HR Bot </title>
      </Helmet>
      <Container>
        <Header />
        <FeedbackTable />
      </Container>
    </>
  );
};

export default Feedback;
