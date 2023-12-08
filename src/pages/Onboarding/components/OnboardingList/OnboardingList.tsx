import { FC, useCallback, useEffect, useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult } from '@hello-pangea/dnd';

import {
  IOnboardingStep,
  IOnboardingStepUpsert,
  useDeleteOnboardingStepMutation,
  useOnboardingStepQuery,
  useUpsertOnboardingStepMutation,
} from '~/store/api';
import { useIsFetching } from '~/hooks';

import { OnboardingItem, CreateOrEditStepDialog } from '../';
import { DeleteDialog } from '~/components/organisms/DeleteDialog';

export const OnboardingList: FC = () => {
  const { data, isFetching } = useOnboardingStepQuery();
  const [upsertOnboardingStep, { isLoading }] = useUpsertOnboardingStepMutation();
  const [deleteOnboardingStep, { isLoading: isDeleteLoading }] = useDeleteOnboardingStepMutation();
  useIsFetching(isFetching, isLoading);

  const [items, setItems] = useState<IOnboardingStep[]>([]);
  const [step, setStep] = useState<IOnboardingStepUpsert | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (data) {
      const newData = JSON.parse(JSON.stringify(data));
      setItems(newData);
    }
  }, [data]);

  const reorder = (list: IOnboardingStep[], startIndex: number, endIndex: number) => {
    const result = [...list];

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(items, result.source.index, result.destination.index);
    setItems(newItems);
    upsertOnboardingStep(newItems.map((item, index) => ({ ...item, order: index })));
  };

  const handleCloseEditDialog = useCallback(() => {
    setOpenEditDialog(false);
    setTimeout(() => setStep(null), 100);
  }, []);

  const handleEdit = useCallback(async (step: IOnboardingStepUpsert) => {
    await upsertOnboardingStep([step]);
    handleCloseEditDialog();
  }, []);

  const handleDelete = async () => {
    if (!step || !step.id) return;
    await deleteOnboardingStep(step.id);
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              <Stack direction="column" alignItems="center">
                {items.map((item, index) => (
                  <OnboardingItem
                    key={item.id}
                    index={index}
                    {...item}
                    selectStep={setStep}
                    openEditDialog={setOpenEditDialog}
                    openDeleteDialog={setOpenDeleteDialog}
                  />
                ))}
              </Stack>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <CreateOrEditStepDialog
        open={openEditDialog}
        step={step}
        loading={!!step && isLoading} // ignore loading until open = true; helps with avoiding of rerendering
        onClose={handleCloseEditDialog}
        onConfirm={handleEdit}
      />
      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={handleDelete}
        loading={isDeleteLoading}
        title="Delete step">
        <>
          <Typography>Are you sure you want to delete this step?</Typography>
          <Typography>This action cannot be undone.</Typography>
        </>
      </DeleteDialog>
    </>
  );
};
