import { FC, memo, MouseEvent, useState } from 'react';
import { Card, IconButton, Link, MenuItem, Popover, Stack, Typography } from '@mui/material';
import { Draggable } from '@hello-pangea/dnd';

import { useResponsive } from '~/hooks';
import { Iconify } from '~/components/atoms/Iconify';
import { IOnboardingStepUpsert } from '~/store/api';

const menuButtonWidth = 36;

interface OnboardingItemProps {
  id: string;
  title: string;
  link: string;
  description: string;
  index: number;
  selectStep: (step: IOnboardingStepUpsert) => void;
  openEditDialog: (open: boolean) => void;
  openDeleteDialog: (open: boolean) => void;
}

export const OnboardingItem: FC<OnboardingItemProps> = memo((props) => {
  const { id, title, description, index, link, selectStep, openEditDialog, openDeleteDialog } = props;
  const smUp = useResponsive({ query: 'up', start: 'sm' });

  const [open, setOpen] = useState<Element | null>(null);

  const handleOpenMenu = (event: MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDelete = () => {
    handleCloseMenu();
    openDeleteDialog(true);
    selectStep({ id, title, description, link, order: index });
  };

  const handleEdit = () => {
    handleCloseMenu();
    selectStep({ id, title, description, link, order: index });
    openEditDialog(true);
  };

  console.count(`OnboardingItem ${index}`);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            m: 2,
            width: smUp ? '30vw' : '90vw',
            cursor: 'grab',
          }}>
          <Stack direction="row" alignItems="flex-start" width="100%" p={2}>
            <Stack width={`calc(100% - ${menuButtonWidth}px)`} gap={2} alignItems="flex-start">
              <Typography noWrap fontWeight={700} sx={{ width: 'inherit' }}>
                {title}
              </Typography>
              <Link rel="noreferrer" target="_blank" underline="hover" color="primary" href={link}>
                <Typography noWrap>Link</Typography>
              </Link>
              <Typography
                color="text.secondary"
                sx={{
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: '3',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    height: '3em',
                    width: '100%',
                    bottom: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(to bottom, transparent, white)',
                  },
                }}>
                {description}
              </Typography>
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
      )}
    </Draggable>
  );
});
