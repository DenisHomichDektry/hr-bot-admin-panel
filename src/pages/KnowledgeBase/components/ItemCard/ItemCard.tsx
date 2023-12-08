import { FC, memo, MouseEvent, useState } from 'react';
import { Card, Grid, Grow, IconButton, Link, MenuItem, Popover, Stack, Typography } from '@mui/material';

import { Iconify } from '~/components/atoms/Iconify';
import { IItem } from '~/store/api';

const menuButtonWidth = 36;

interface IItemCardProps {
  id: string;
  title: string;
  link: string;
  setItem: (item: IItem) => void;
  openDeleteDialog: (open: boolean) => void;
  openEditDialog: (open: boolean) => void;
}
export const ItemCard: FC<IItemCardProps> = memo((props) => {
  const { title, link, setItem, id, openDeleteDialog, openEditDialog } = props;

  const [open, setOpen] = useState<Element | null>(null);

  const handleOpenMenu = (event: MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDelete = () => {
    handleCloseMenu();
    setItem({ id, title, link } as IItem);
    openDeleteDialog(true);
  };

  const handleEdit = () => {
    handleCloseMenu();
    setItem({ id, title, link } as IItem);
    openEditDialog(true);
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Grow in>
        <Card
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Stack direction="row" alignItems="flex-start" width="100%" p={2}>
            <Stack width={`calc(100% - ${menuButtonWidth}px)`} gap={2} alignItems="flex-start">
              <Typography fontWeight={700} sx={{ width: 'inherit' }} noWrap>
                {title}
              </Typography>
              <Link rel="noreferrer" target="_blank" underline="hover" href={link} color="primary">
                <Typography>Link</Typography>
              </Link>
            </Stack>
            <IconButton
              onClick={handleOpenMenu}
              sx={{
                flex: 2,
              }}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>

          <Popover
            open={!!open}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            PaperProps={{
              sx: { width: 140 },
            }}>
            <MenuItem onClick={handleEdit}>
              <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
              <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
        </Card>
      </Grow>
    </Grid>
  );
});
