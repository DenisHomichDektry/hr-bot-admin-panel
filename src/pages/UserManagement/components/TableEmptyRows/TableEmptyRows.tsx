import { FC } from 'react';

import { TableRow, TableCell } from '@mui/material';

interface ITableEmptyRowsProps {
  emptyRows: number;
  height?: number;
}

export const TableEmptyRows: FC<ITableEmptyRowsProps> = ({ emptyRows, height }) => {
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}>
      <TableCell colSpan={9} />
    </TableRow>
  );
};
