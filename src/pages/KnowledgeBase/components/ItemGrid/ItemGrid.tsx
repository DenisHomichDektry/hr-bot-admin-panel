import { FC, useEffect, useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';

import { ICategory, IItem, useDeleteItemMutation, useEditItemMutation } from '~/store/api';
import { DeleteDialog } from '~/components/organisms/DeleteDialog';

import { TItemEdit } from '../../types.ts';
import { CreateOrEditDialog, ItemCard } from '../index.ts';
import { useError } from '~/hooks';

interface IITemGridProps {
  items?: IItem[];
  categories: ICategory[];
  currentCategory?: string;
}

export const ItemGrid: FC<IITemGridProps> = ({ items, categories, currentCategory }) => {
  const [item, setItem] = useState<IItem | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const [
    deleteItem,
    { isLoading: isDeleting, isError: isDeleteError, isSuccess: isDeleteSuccess, error: deleteError },
  ] = useDeleteItemMutation();
  const [editItem, { isLoading: isEditing, isError: isEditError, isSuccess: isEditSuccess, error: editError }] =
    useEditItemMutation();
  useError(deleteError, editError);

  useEffect(() => {
    if (isDeleteError || isDeleteSuccess || isEditError || isEditSuccess) {
      handleDialogClose();
    }
  }, [isDeleteSuccess, isDeleteError, isEditError, isEditSuccess]);

  const handleItemEdit = (item: IItem) => {
    setItem(item);
    setOpenEditDialog(true);
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    // wait for dialog to close before resetting item
    setTimeout(() => {
      setItem(null);
    }, 150);
  };

  const handleDelete = () => {
    if (item) {
      deleteItem(item.id);
    }
  };

  const handleEdit = (item: TItemEdit) => {
    if ('id' in item) {
      editItem(item);
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        {items ? (
          items.length ? (
            items.map((item, index) => {
              const { title, link, id } = item;
              return (
                <ItemCard
                  key={id}
                  title={title}
                  link={link}
                  id={id}
                  setItem={setItem}
                  openDeleteDialog={setOpenDeleteDialog}
                  openEditDialog={setOpenEditDialog}
                />
              );
            })
          ) : (
            <Grid item xs={12}>
              <Stack alignItems="center" justifyContent="center">
                <Typography variant="h6">No items</Typography>
              </Stack>
            </Grid>
          )
        ) : null}
      </Grid>
      <CreateOrEditDialog
        item={item}
        categories={categories}
        currentCategory={currentCategory}
        open={openEditDialog}
        onClose={handleDialogClose}
        onConfirm={handleEdit}
        loading={isEditing}
      />
      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={handleDelete}
        loading={isDeleting}
        title="Delete Item">
        <>
          <Typography>Are you sure you want to delete this item?</Typography>
          <Typography>This action cannot be undone.</Typography>
        </>
      </DeleteDialog>
    </>
  );
};
