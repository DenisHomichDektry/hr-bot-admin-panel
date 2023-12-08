import { FC, ReactNode, useState } from 'react';
import { Box } from '@mui/material';

import { PageLoading } from '~/components/organisms/PageLoading';
import { Scrollbar } from '~/components/atoms/Scrollbar';

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
    <Scrollbar>
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
          <Box sx={displayChildren ? {} : { display: 'none' }}>{children}</Box>
        </Main>
      </Box>
    </Scrollbar>
  );
};
