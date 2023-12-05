import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useResponsive } from '~/hooks';
import { ICategory, IItem } from '~/store/api';

import { ItemForm } from '../index.ts';
import { TItemEdit } from '../../types.ts';

interface ICreateOrEditDialogProps {
  item?: IItem | null;
  categories: ICategory[];
  currentCategory?: string;
  open: boolean;
  onClose: () => void;
  onConfirm: (item: TItemEdit) => void;
  loading?: boolean;
  disableConfirm?: boolean;
}

export const CreateOrEditDialog: FC<ICreateOrEditDialogProps> = (props) => {
  const { open, onClose, onConfirm, item, categories, disableConfirm, loading, currentCategory } = props;
  const smUp = useResponsive({ query: 'up', start: 'sm' });

  return (
    <Dialog fullWidth={!smUp} open={open} onClose={onClose}>
      <DialogTitle>{item ? 'Edite item' : 'New item'}</DialogTitle>
      <DialogContent>
        <ItemForm item={item} categories={categories} currentCategory={currentCategory} onSubmit={onConfirm} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton form="item-form" type="submit" disabled={disableConfirm} loading={loading} variant="contained">
          {item ? 'Edit' : 'Create'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
