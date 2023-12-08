import { FC, useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import { Iconify } from '~/components/atoms/Iconify';
import { CustomSelect } from '~/components/molecules/CustomSelect';
import { useError, useResponsive } from '~/hooks';
import {
  ICategory,
  knowledgeBaseApi,
  useCreateItemMutation,
  useDeleteCategoryMutation,
  useUpsertCategoryMutation,
} from '~/store/api';
import { useAppDispatch } from '~/store';
import { TAGS } from '~/constants';

import { CategoryDialog, CreateOrEditDialog } from '../index.ts';
import { TItemEdit } from '../../types.ts';

interface IHeaderProps {
  categories?: ICategory[];
  currentCategory: string;
  setCurrentCategory: (id: string) => void;
  displayCategoriesSelect: boolean;
}

export const Header: FC<IHeaderProps> = (props) => {
  const { categories, currentCategory, setCurrentCategory, displayCategoriesSelect } = props;
  const dispatch = useAppDispatch();

  const smUp = useResponsive({ query: 'up', start: 'sm' });

  const [
    createItem,
    { isLoading: isCreatingItem, isError: isCreateItemError, isSuccess: isCreateItemSuccess, error: createItemError },
  ] = useCreateItemMutation();
  const [
    upsertCategory,
    {
      isLoading: isUpsertCategoryLoading,
      isError: isUpsertCategoryError,
      isSuccess: isUpsertCategorySuccess,
      error: upsertCategoryError,
    },
  ] = useUpsertCategoryMutation();
  const [
    deleteCategory,
    {
      isLoading: isDeletingCategory,
      isError: isDeleteCategoryError,
      isSuccess: isDeleteCategorySuccess,
      error: deleteCategoryError,
    },
  ] = useDeleteCategoryMutation();
  useError(createItemError, upsertCategoryError, deleteCategoryError);

  const [openCreateItemDialog, setOpenCreateItemDialog] = useState<boolean>(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState<boolean>(false);

  useEffect(() => {
    if (isCreateItemSuccess || isCreateItemError || isUpsertCategoryError || isUpsertCategorySuccess) {
      handleDialogClose();
    }
  }, [
    isCreateItemSuccess,
    isCreateItemError,
    isUpsertCategoryError,
    isUpsertCategorySuccess,
    isDeleteCategoryError,
    isDeleteCategorySuccess,
  ]);

  const handleDialogClose = () => {
    setOpenCreateItemDialog(false);
    setOpenCategoryDialog(false);
  };

  const handleCreateItem = (item: TItemEdit) => {
    createItem(item);
  };

  const handleConfirm = async (newCategories: ICategory[]) => {
    if (!categories) return;

    const deletedCategories = categories.filter((category) => !newCategories.find((c) => c.id === category.id));

    const queryArr = [];

    if (newCategories.length) queryArr.push(upsertCategory(newCategories).unwrap());
    if (deletedCategories.length) queryArr.push(deleteCategory(deletedCategories).unwrap());

    try {
      await Promise.all(queryArr);

      if (deletedCategories.length === categories.length) {
        setCurrentCategory('');
        dispatch(knowledgeBaseApi.util.invalidateTags([{ type: TAGS.ITEM, id: 'LIST' }]));
      } else if (currentCategory && deletedCategories.find((c) => c.id === currentCategory)) {
        setCurrentCategory(newCategories[0]?.id || '');
      }

      handleDialogClose();
    } catch (e) {
      // problem
    }
  };

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Knowledge Base</Typography>

        {smUp ? (
          <Button
            onClick={() => setOpenCategoryDialog(true)}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="fluent:list-24-filled" />}>
            Modify Categories
          </Button>
        ) : null}
      </Stack>
      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <CustomSelect
          label="Category"
          sx={{
            width: smUp ? '250px' : '100%',
            visibility: displayCategoriesSelect ? 'visible' : 'hidden',
          }}
          onChange={(e) => {
            setCurrentCategory(e.target.value);
          }}
          value={currentCategory}
          options={categories || []}
        />
        {smUp ? (
          <Button
            onClick={() => setOpenCreateItemDialog(true)}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}>
            New Item
          </Button>
        ) : null}
      </Stack>
      {!smUp ? (
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <Button
            onClick={() => setOpenCategoryDialog(true)}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="fluent:list-24-filled" />}>
            Modify Categories
          </Button>
          <Button
            onClick={() => setOpenCreateItemDialog(true)}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}>
            New Item
          </Button>
        </Stack>
      ) : null}
      <CreateOrEditDialog
        categories={categories || []}
        currentCategory={currentCategory}
        open={openCreateItemDialog}
        onClose={handleDialogClose}
        onConfirm={handleCreateItem}
        loading={isCreatingItem}
      />
      <CategoryDialog
        categories={categories || []}
        loading={isUpsertCategoryLoading || isDeletingCategory}
        open={openCategoryDialog}
        onClose={handleDialogClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};
