import { FC } from 'react';

import { Paper, TableCell, TableRow, Typography } from '@mui/material';

export const TableNoData: FC = () => {
  return (
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}>
          <Typography variant="h6" paragraph>
            No data
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
};
