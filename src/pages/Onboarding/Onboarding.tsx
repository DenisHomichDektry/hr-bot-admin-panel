import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { Header, OnboardingList } from '~/pages/Onboarding/components';

const Onboarding = () => {
  console.count('Onboarding');
  return (
    <>
      <Helmet>
        <title> Onboarding | HR Bot </title>
      </Helmet>
      <Container>
        <Header />
        <OnboardingList />
      </Container>
    </>
  );
};

export default Onboarding;
