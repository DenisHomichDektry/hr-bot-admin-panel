import { FC, useState, MouseEvent } from 'react';

import { TableRow, TableCell, Checkbox, Stack, Typography, Avatar, IconButton, MenuItem, Popover } from '@mui/material';

import { Iconify } from '~/components/atoms/Iconify';

interface IUserTableRowProps {
  name: string;
  email: string | null;
  avatarUrl: string | null;
  role: string;
  position: string | null;
  onDelete: () => void;
  onEdit: () => void;
}

export const UserTableRow: FC<IUserTableRowProps> = (props) => {
  const { name, email, avatarUrl, role, onDelete, onEdit, position } = props;
  const [open, setOpen] = useState<Element | null>(null);

  const handleOpenMenu = (event: MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDelete = () => {
    handleCloseMenu();
    onDelete();
  };

  const handleEdit = () => {
    handleCloseMenu();
    onEdit();
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl || undefined} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{position || '—'}</TableCell>
        <TableCell>{role}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
    </>
  );
};
