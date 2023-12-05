import { FC, ReactNode } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

interface IDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  loading?: boolean;
  title?: string;
  children?: ReactNode;
}

export const DeleteDialog: FC<IDeleteDialogProps> = (props) => {
  const { open, onClose, children, title, onDelete, loading } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton loading={loading} variant="contained" color="error" onClick={onDelete}>
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
