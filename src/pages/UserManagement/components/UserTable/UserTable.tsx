import { ChangeEventHandler, FC, useEffect, useState, MouseEvent } from 'react';
import { Card, Stack, Table, TableBody, TableContainer, TablePagination, Typography } from '@mui/material';

import {
  IUpdateUser,
  IUser,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUserRolesQuery,
  useUsersQuery,
} from '~/store/api';
import { useIsFetching, useError } from '~/hooks';
import { Scrollbar } from '~/components/atoms/Scrollbar';
import { DeleteDialog } from '~/components/organisms/DeleteDialog';
import { TableEmptyRows } from '~/components/organisms/TableEmptyRows';
import { TableNoData } from '~/components/organisms/TableNoData';

import { UserTableHead, UserTableRow, EditDialog, ErrorMessage } from '../index.ts';
import { IHeadLabel } from '../../types.ts';

const headLabel: IHeadLabel[] = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'position', label: 'Position' },
  { id: 'role', label: 'Role' },
  { id: '' },
];

export const UserTable: FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const {
    data: usersData,
    isFetching: isFetchingUsers,
    isError: isUsersError,
    error: usersError,
  } = useUsersQuery({ page, limit: rowsPerPage });
  const [users, count] = usersData || [];
  const { data: roles, isFetching: isFetchingRoles, isError: isRolesError, error: rolesError } = useUserRolesQuery();
  useIsFetching(isFetchingUsers, isFetchingRoles);

  const [
    deleteUser,
    { isLoading: isDeletingUser, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteUserError },
  ] = useDeleteUserMutation();
  const [
    updateUser,
    { isLoading: isUpdatingUser, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateUserError },
  ] = useUpdateUserMutation();

  useError(usersError, rolesError, deleteUserError, updateUserError);

  useEffect(() => {
    if (isDeleteSuccess || isDeleteError || isUpdateSuccess || isUpdateError) {
      setOpenDeleteDialog(false);
      setOpenEditDialog(false);
      setCurrentUser(null);
    }
  }, [isDeleteSuccess, isDeleteError, isUpdateSuccess, isUpdateError]);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleDelete = () => {
    if (currentUser) {
      deleteUser(currentUser.id);
    }
  };

  const handleEdit = (user: IUpdateUser) => {
    updateUser(user);
  };

  if (isUsersError || isRolesError) {
    return <ErrorMessage errors={[usersError, rolesError]} />;
  }

  return users ? (
    <Card>
      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead headLabel={headLabel} />
            <TableBody>
              {users.map((row) => (
                <UserTableRow
                  key={row.id}
                  name={row.firstName + ' ' + row.lastName}
                  role={row.role.name}
                  avatarUrl={row.imgUrl}
                  email={row.email}
                  position={row.position}
                  onDelete={() => {
                    setOpenDeleteDialog(true);
                    setCurrentUser(row);
                  }}
                  onEdit={() => {
                    setCurrentUser(row);
                    setOpenEditDialog(true);
                  }}
                />
              ))}
              <TableEmptyRows height={73} emptyRows={users.length ? Math.max(0, rowsPerPage - users.length) : 0} />
              {users.length === 0 && <TableNoData />}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <TablePagination
        page={page}
        component="div"
        count={count || 0}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={handleDelete}
        title="Delete user"
        loading={isDeletingUser}>
        Are you sure you want to delete {currentUser ? currentUser.firstName + ' ' + currentUser.lastName : 'this user'}
        ?
      </DeleteDialog>
      <EditDialog
        open={openEditDialog}
        user={currentUser}
        onClose={() => setOpenEditDialog(false)}
        onSave={handleEdit}
        roles={roles}
        loading={isUpdatingUser}
      />
    </Card>
  ) : null;
};
