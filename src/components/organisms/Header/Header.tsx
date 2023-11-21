import { FC } from 'react';
import { AppBar, Box, IconButton, Stack, Toolbar, useTheme } from '@mui/material';

import { bgBlur } from '~/theme/css';
import { useResponsive } from '~/hooks/use-responsive';
import { Iconify } from '~/components/atoms/Iconify';
import { Searchbar } from '~/components/organisms/SearchBar';
import { NotificationsPopover } from '~/components/organisms/NotificationPopover';
import { HEADER, NAV } from '~/constants';
import { AccountPopover } from '~/components/organisms/AccountPopover';

interface IHeaderProps {
  onOpenNav: () => void;
}

function LanguagePopover() {
  return null;
}

export const Header: FC<IHeaderProps> = ({ onOpenNav }) => {
  const theme = useTheme();

  const lgUp = useResponsive({ query: 'up', start: 'lg' });

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <LanguagePopover />
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}>
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}>
        {renderContent}
      </Toolbar>
    </AppBar>
  );
};
