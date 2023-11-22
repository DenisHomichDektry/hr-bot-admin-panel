import { FC, ReactNode, useState } from 'react';
import { Box } from '@mui/material';

import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { Main } from './components/Main';

export const RootLayout: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}>
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
};
