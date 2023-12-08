import { FC, ReactNode, useState } from 'react';
import { Box } from '@mui/material';

import { PageLoading } from '~/components/organisms/PageLoading';

import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { Main } from './components/Main';
import { useDisplayChildren } from './hook.ts';

export const RootLayout: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const displayChildren = useDisplayChildren();

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

        <Main>
          {displayChildren ? null : <PageLoading />}
          {displayChildren ? children : <Box sx={{ position: 'absolute', opacity: 0 }}>{children}</Box>}
        </Main>
      </Box>
    </>
  );
};
