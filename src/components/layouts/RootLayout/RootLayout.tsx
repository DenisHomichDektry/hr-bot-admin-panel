import { FC, ReactNode, useState } from 'react';
import { Box } from '@mui/material';

import { Header } from '~/components/organisms/Header/Header.tsx';

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
        {/*<Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />*/}

        {/*<Main>{children}</Main>*/}
        <Box>{children}</Box>
      </Box>
    </>
  );
};
