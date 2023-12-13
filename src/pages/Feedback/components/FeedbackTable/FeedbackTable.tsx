import { ChangeEventHandler, FC, useState, MouseEvent } from 'react';
import { Card, Table, TableBody, TableContainer, TablePagination, Typography } from '@mui/material';

import { useIsFetching, useError } from '~/hooks';
import { Scrollbar } from '~/components/atoms/Scrollbar';
import { TableEmptyRows } from '~/components/organisms/TableEmptyRows';
import { TableNoData } from '~/components/organisms/TableNoData';
import { IHeadLabel } from '~/pages/UserManagement/types.ts';
import { useFeedbacksQuery } from '~/store/api';

import { FeedbackTableHead, FeedbackTableRow } from '../';

const headLabel: IHeadLabel[] = [
  { id: 'name', label: 'Name' },
  { id: 'score', label: 'Score' },
  { id: 'details', label: 'Details' },
];

export const FeedbackTable: FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isFetching, error } = useFeedbacksQuery({ page, limit: rowsPerPage });
  const [feedbacks, count] = data || [];
  useIsFetching(isFetching);
  useError(error);

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Card>
      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <FeedbackTableHead headLabel={headLabel} />
            <TableBody>
              {feedbacks?.map((row) => (
                <FeedbackTableRow key={row.id} name={row.user.firstName + ' ' + row.user.lastName} score={row.value} />
              ))}
              <TableEmptyRows
                height={55}
                emptyRows={feedbacks?.length ? Math.max(0, rowsPerPage - feedbacks.length) : 0}
              />
              {feedbacks?.length === 0 && <TableNoData />}
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
    </Card>
  );
};
