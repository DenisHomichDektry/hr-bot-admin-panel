import { useEffect, FC } from 'react';
import { ListItemButton, alpha, Box, Drawer, Typography, Stack, Avatar } from '@mui/material';

import { useResponsive } from '~/hooks';
import { account } from '~/_mock/account';
import { Scrollbar } from '~/components/atoms/Scrollbar';
import { usePathname } from '~/routes/hooks';
import { RouterLink } from '~/routes/components/RouterLink';
import { Logo } from '~/components/atoms/Logo';
import { NAV } from '~/constants';
import { isTokenExist } from '~/utils';
import { useAppDispatch } from '~/store';
import { handleExpiredToken } from '~/store/common';

import { INavItem, navConfig } from './config-navigation';

// ----------------------------------------------------------------------
interface INavProps {
  openNav: boolean;
  onCloseNav: () => void;
}
export const Nav: FC<INavProps> = ({ openNav, onCloseNav }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const upLg = useResponsive({ query: 'up', start: 'lg' });

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }

    let timeout: number;
    if (!isTokenExist()) {
      timeout = setTimeout(() => {
        dispatch(handleExpiredToken());
      });
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}>
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          // type role here
          {/*{account.role}*/}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}>
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}>
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}>
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}>
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

// ----------------------------------------------------------------------
interface INavItemProps {
  item: INavItem;
}
const NavItem: FC<INavItemProps> = ({ item }) => {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}>
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
};
