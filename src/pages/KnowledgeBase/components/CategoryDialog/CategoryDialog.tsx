import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useResponsive } from '~/hooks';
import { ICategory } from '~/store/api';

import { CategoryForm } from '../index.ts';

interface ICategoryDialogProps {
  categories: ICategory[];
  open: boolean;
  onClose: () => void;
  onConfirm: (newCategories: ICategory[]) => void;
  loading?: boolean;
  disableConfirm?: boolean;
}

export const CategoryDialog: FC<ICategoryDialogProps> = (props) => {
  const { open, onClose, onConfirm, categories, disableConfirm, loading } = props;
  const smUp = useResponsive({ query: 'up', start: 'sm' });

  return (
    <Dialog fullScreen={!smUp} open={open} onClose={onClose}>
      <DialogTitle>Modify Categories</DialogTitle>
      <DialogContent sx={{ pr: '16px' }}>
        <CategoryForm categories={categories} onSubmit={onConfirm} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          form="category-form"
          type="submit"
          disabled={disableConfirm}
          loading={loading}
          variant="contained">
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
